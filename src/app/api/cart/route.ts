import { ErrorResponse } from "@/lib/errorResponse";
import { SuccessResponse } from "@/lib/successResponse";
import { addProductToCart } from "@/services/cart/addProductToCart";
import { getUserCartItems } from "@/services/cart/getUserCartItems";
import { updateCartProductQuantity } from "@/services/cart/updateProductQuantity";
import { getProductById } from "@/services/product/getProductById";
import { getUserById } from "@/services/user/getUserById";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredToken } from "@/utils/middleware/tokenMiddleware";
import { verifyReqToken } from "@/utils/token/verifyReqToken";
import { cartSchema } from "@/utils/validation/cart";

export async function GET(req: Request) {
  try {
    await requiredToken(req);

    const userId = await verifyReqToken(req);
    const isUserExist = await getUserById({ id: userId });

    if (!isUserExist) {
      return ErrorResponse({ message: "User not found", status: 404 });
    }

    const cart = await getUserCartItems({ id: userId });
    const cartProduct = cart.map((item) => {
      return {
        quantity: item.quantity,
        ...item.product,
      };
    });

    return SuccessResponse({
      data: cartProduct,
      message: "Successfully fetched cart",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function POST(req: Request) {
  try {
    const userId = await verifyReqToken(req);
    const body = cartSchema.parse(await req.json());

    const isProductExist = await getProductById({ id: body.productId });
    if (!isProductExist) {
      return ErrorResponse({ message: "Product not found", status: 404 });
    }

    const addProduct = await addProductToCart({
      data: {
        userId: userId,
        productId: body.productId,
        quantity: body.quantity,
      },
    });

    return SuccessResponse({
      data: addProduct,
      message: "Successfully added to cart",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function PUT(req: Request) {
  try {
    const userId = await verifyReqToken(req);

    const body = cartSchema.parse(await req.json());

    const user = await getUserById({ id: userId });

    if (!user) {
      return ErrorResponse({ message: "User not found", status: 404 });
    }

    const product = await getProductById({ id: body.productId });

    if (!product) {
      return ErrorResponse({ message: "Product not found", status: 404 });
    }

    const updateProductCart = await updateCartProductQuantity({
      data: {
        userId: userId,
        productId: body.productId,
        quantity: body.quantity,
      },
    });

    return SuccessResponse({
      data: updateProductCart,
      message: "Product removed",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}
