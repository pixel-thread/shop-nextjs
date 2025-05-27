import { UnauthorizedError } from "../errors/unAuthError";
import { requiredToken } from "../middleware/tokenMiddleware";
import { verifyToken } from "./verifyToken";

export async function verifyReqToken(req: Request): Promise<string> {
  await requiredToken(req);
  const header = req.headers.get("Authorization");
  const token = header?.split(" ")[1];
  const decoded = await verifyToken(token);
  const userId = decoded.id;
  if (!userId) throw new UnauthorizedError("Unauthorized");
  return userId;
}
