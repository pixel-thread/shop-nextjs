import { UnauthorizedError } from "../errors/unAuthError";
import { requiredToken } from "./tokenMiddleware";

export async function superAdminMiddleware(req: Request) {
  const auth = await requiredToken(req);
  if (!auth) {
    throw new UnauthorizedError("Unauthorized");
  }

  if (auth.user.role !== "SUPER_ADMIN") {
    throw new UnauthorizedError("Permission Denied");
  }
}
