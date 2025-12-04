import { UnauthorizedError } from "../errors/unAuthError";
import { requiredToken } from "./tokenMiddleware";

export async function requiredAdminMiddleware(req: Request) {
  const user = await requiredToken(req);
  switch (user.role) {
    case "SUPER_ADMIN":
      break;
    case "ADMIN":
      break;
    default:
      throw new UnauthorizedError("Permission Denied");
  }
  return user;
}
