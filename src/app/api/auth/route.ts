import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { NextRequest } from "next/server";
import { SuccessResponse } from "@/lib/successResponse";
import { requiredToken } from "@/utils/middleware/tokenMiddleware";

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
    const user = await requiredToken(req);

    const response = SuccessResponse({
      data: user,
      message: "User verified successfully",
    });

    return response;
  } catch (error) {
    return handleApiErrors(error);
  }
}
