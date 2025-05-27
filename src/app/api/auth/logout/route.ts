import { ErrorResponse } from "@/lib/errorResponse";
import { SuccessResponse } from "@/lib/successResponse";
import { getUnRevokedToken } from "@/services/token/getUnRevokedToken";
import { revokeToken } from "@/services/token/revokeToken";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";

export async function POST(req: Request) {
  try {
    const headers = req.headers;
    const bearerToken = headers.get("authorization")?.split(" ")[1];
    if (!bearerToken) {
      return ErrorResponse({ message: "Unauthorized", status: 401 });
    }
    const getToken = await getUnRevokedToken({
      where: {
        token: bearerToken,
        revoked: false,
        expiresAt: { gt: new Date() },
      },
    });
    if (!getToken) {
      return ErrorResponse({ message: "Unauthorized", status: 401 });
    }

    const updateToken = await revokeToken({
      where: { id: getToken.id, token: getToken.token },
    });
    if (updateToken) {
      return SuccessResponse({ message: "Logout successfully" });
    }
    return ErrorResponse({ message: "Token not found", status: 404 });
  } catch (error) {
    return handleApiErrors(error);
  }
}
