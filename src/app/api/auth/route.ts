import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { NextRequest } from "next/server";
import { generateToken } from "@/utils/token/generateToken";
import { verifyToken } from "@/utils/token/verifyToken";
import { getUserById } from "@/services/user/getUserById";
import { SuccessResponse } from "@/lib/successResponse";
import { requiredToken } from "@/utils/middleware/tokenMiddleware";
import { ErrorResponse } from "@/lib/errorResponse";
import { addNewToken } from "@/services/token/addNewToken";
import { registerSchema } from "@/utils/validation/auth/register";
import { env } from "@/env";
import { logger } from "@/utils/logger";
import { getAuthByEmail } from "@/services/auth/getAuthByEmail";
import { AUTH_TOKEN_KEY } from "@/lib/constants/token";
import { revokeToken } from "@/services/token/revokeToken";
import { getUnRevokedToken } from "@/services/token/getUnRevokedToken";
import { updateAuthOtp } from "@/services/auth/updateAuthOtp";
import { verifyReqToken } from "@/utils/token/verifyReqToken";

/**
 * GET /api/v1/auth
 * Retrieves the authenticated user's profile information
 *
 * @requires Authorization Bearer token in header
 *
 * @returns {Object} Success Response
 *   - 200: User profile data
 *   - 401: Unauthorized - Invalid or missing token
 *   - 404: User not found
 */

export async function GET(req: NextRequest) {
  try {
    await requiredToken(req);

    const userId = await verifyReqToken(req);

    if (!userId) {
      return ErrorResponse({ message: "Unauthorized", status: 401 });
    }

    const user = await getUserById({ id: userId });

    if (!user) {
      return ErrorResponse({ message: "Unauthorized", status: 401 });
    }

    const response = SuccessResponse({
      data: user,
      message: "User verified successfully",
    });

    return response;
  } catch (error) {
    return handleApiErrors(error);
  }
}

/**
 * POST /api/v1/auth
 * Authenticates a user and manages token issuance
 *
 * @requires Request Body
 *   - email: string
 *   - password: string
 *
 * @returns {Object} Response
 *   - 200: {
 *       success: boolean,
 *       token: string,
 *       message: string
 *     }
 *   - 401: Invalid credentials
 *   - 404: User not found
 *
 * @description
 * - Validates user credentials
 * - Checks for existing valid tokens
 * - Issues new token if needed
 * - Sets AUTH_TOKEN cookie
 * - Token expires in 24 hours
 */

export async function POST(req: Request) {
  try {
    const body = registerSchema
      .pick({ email: true, otp: true })
      .parse(await req.json());

    const auth = await getAuthByEmail({ email: body.email });

    if (!auth) {
      return ErrorResponse({
        message: "User not found",
        status: 404,
      });
    }

    const INTERNAL_CODE = env.INTERNAL_CODE;

    if (auth.isInternal) {
      // For internal users, check if OTP matches either internal code or user's OTP
      if (auth.otpExpiresAt < new Date()) {
        return ErrorResponse({
          message: "OTP expired",
          status: 401,
        });
      }

      if (
        Number(body.otp) !== Number(INTERNAL_CODE) &&
        Number(body.otp) !== auth.otp
      ) {
        return ErrorResponse({
          message: "Invalid OTP Internal",
          status: 401,
          error: { code: Number(INTERNAL_CODE), error: body.otp },
        });
      }
    } else {
      // For non-internal users, check only against user's OTP
      if (Number(body.otp) !== auth.otp) {
        return ErrorResponse({
          message: "Invalid OTP",
          status: 401,
        });
      }
    }
    if (auth.isOtpRevoked) {
      return ErrorResponse({
        message: "Invalid OTP",
        status: 401,
      });
    }

    // Check for existing valid token before generating a new one
    const now = new Date();

    const existingToken = await getUnRevokedToken({
      where: {
        authId: auth.id,
        revoked: false,
      },
    });

    let tokenValue: string;

    if (existingToken && existingToken.expiresAt > now) {
      tokenValue = existingToken.token;
    } else {
      if (existingToken) {
        await revokeToken({
          where: { id: existingToken.id },
          userId: auth.userId,
        });
      }

      // Generate new token
      tokenValue = await generateToken({ id: auth.userId });

      // Store the new token
      await addNewToken({
        token: tokenValue,
        authId: auth.id,
        agent: req.headers.get("user-agent") || "N/A",
      });
    }

    // Return success response with token
    const response = SuccessResponse({
      token: tokenValue,
      message: "Login successful",
    });
    await updateAuthOtp({
      where: { id: auth.id },
      isOtpRevoked: true,
      otpCode: auth.otp,
    });
    // Set cookie with the token
    response.cookies.set(AUTH_TOKEN_KEY, tokenValue, {
      path: "/",
      secure: true,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return handleApiErrors(error);
  }
}
