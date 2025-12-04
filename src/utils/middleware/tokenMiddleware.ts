import { NextRequest } from "next/server";
import { UnauthorizedError } from "../errors/unAuthError";
import { verifyToken } from "@clerk/backend";
import { env } from "@/env";
import { getUniqueAuth } from "@/services/auth/getUniqueAuth";
import { createUser } from "@/services/user/createUser";
import { clerk } from "@/lib/clerk";
/**
 * Middleware to validate and manage authentication tokens
 *
 * @param req - NextRequest or Request object containing the authorization header
 * @throws {Error} When token is missing or invalid
 * @throws {Error} When token is not found or expired
 *
 * @description
 * - Extracts Bearer token from authorization header
 * - Validates token existence and activity status
 * - Automatically extends token expiration if within 3 days of expiry
 * - Token extension adds 7 days to current expiration date
 *
 * @example
 * ```typescript
 * // Usage in API route
 * await tokenMiddleware(request);
 * ```
 */
export async function requiredToken(req: NextRequest | Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Unauthorized");
  }

  const claims = await verifyToken(token, {
    secretKey: env.CLERK_SECRET_KEY,
  });

  if (!claims?.sub) {
    throw new UnauthorizedError("Unauthorized");
  }

  const auth = await getUniqueAuth({ where: { clerkId: claims.sub } });

  if (!auth) {
    const clerkUser = await clerk.users.getUser(claims.sub);

    if (!clerkUser) {
      throw new UnauthorizedError("Unauthorized");
    }

    const user = await createUser({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser?.primaryEmailAddress?.emailAddress,
        isInternal: false,
        phone: clerkUser?.primaryPhoneNumber?.phoneNumber || "",
        user: {
          create: {
            name: clerkUser.firstName,
            profilePic: clerkUser.imageUrl,
          },
        },
      },
    });

    return user.user;
  }

  return auth.user;
}
