import { ErrorResponse } from "@/lib/errorResponse";
import { SuccessResponse } from "@/lib/successResponse";
import { removeAllUserProductFromCart } from "@/services/cart/removeAllProductFromCart";
import { getProductById } from "@/services/product/getProductById";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredToken } from "@/utils/middleware/tokenMiddleware";
import { cartSchema } from "@/utils/validation/cart";

export async function POST(req: Request) {
  try {
    const user = await requiredToken(req);

    const body = cartSchema.pick({ productId: true }).parse(await req.json());

    const product = await getProductById({ id: body.productId });

    if (!product) {
      return ErrorResponse({ message: "Product not found", status: 404 });
    }

    const removeProduct = await removeAllUserProductFromCart({
      userId: user.id,
      productId: body.productId,
    });

    return SuccessResponse({ data: removeProduct, message: "Product removed" });
  } catch (error) {
    return handleApiErrors(error);
  }
}
