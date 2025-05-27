import { ErrorResponse } from "@/lib/errorResponse";
import { SuccessResponse } from "@/lib/successResponse";
import { removeAllUserProductFromCart } from "@/services/cart/removeAllProductFromCart";
import { getProductById } from "@/services/product/getProductById";
import { getUserById } from "@/services/user/getUserById";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { verifyReqToken } from "@/utils/token/verifyReqToken";
import { cartSchema } from "@/utils/validation/cart";

export async function POST(req: Request) {
  try {
    const userId = await verifyReqToken(req);

    const body = cartSchema.pick({ productId: true }).parse(await req.json());

    const user = await getUserById({ id: userId });

    if (!user) {
      return ErrorResponse({ message: "User not found", status: 404 });
    }

    const product = await getProductById({ id: body.productId });

    if (!product) {
      return ErrorResponse({ message: "Product not found", status: 404 });
    }

    const removeProduct = await removeAllUserProductFromCart({
      userId: userId,
      productId: body.productId,
    });

    return SuccessResponse({ data: removeProduct, message: "Product removed" });
  } catch (error) {
    return handleApiErrors(error);
  }
}
