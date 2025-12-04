import { ErrorResponse } from "@/lib/errorResponse";
import { SuccessResponse } from "@/lib/successResponse";
import { getProductById } from "@/services/product/getProductById";
import { getUserById } from "@/services/user/getUserById";
import { addProductToUserWishList } from "@/services/wishlist/addProductToUserWishList";
import { getUserWishList } from "@/services/wishlist/getUserWishList";
import { getUserWishListProduct } from "@/services/wishlist/getWishListProduct";
import { removeAllFromWishList } from "@/services/wishlist/removeAllFromWishList";
import { removeProductFromWishList } from "@/services/wishlist/removeFromWishList";
import { handleApiErrors } from "@/utils/errors/handleApiErrors";
import { requiredToken } from "@/utils/middleware/tokenMiddleware";
import { cartSchema } from "@/utils/validation/cart";

export async function GET(req: Request) {
  try {
    const user = await requiredToken(req);

    const wishList = await getUserWishList({ id: user.id });

    const data = wishList.map((item) => item.product);

    return SuccessResponse({
      data: data,
      message: "Successfully fetched WishList",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requiredToken(req);

    const body = cartSchema.pick({ productId: true }).parse(await req.json());

    const isProductExist = await getProductById({ id: body.productId });

    if (!isProductExist) {
      return ErrorResponse({ message: "Product not found", status: 404 });
    }

    const isAlreadyAdded = await getUserWishListProduct({
      userId: user.id,
      productId: body.productId,
    });

    if (isAlreadyAdded) {
      return SuccessResponse({ message: "Product added to Wish List" });
    }

    const addProduct = await addProductToUserWishList({
      data: {
        product: { connect: { id: body.productId } },
        user: { connect: { id: user.id } },
      },
    });

    return SuccessResponse({
      data: addProduct,
      message: "Successfully added to Wish List",
    });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function PUT(req: Request) {
  try {
    const user = await requiredToken(req);
    const body = cartSchema.pick({ productId: true }).parse(await req.json());

    const product = await getProductById({ id: body.productId });

    if (!product) {
      return ErrorResponse({ message: "Product not found", status: 404 });
    }

    const removeProduct = await removeProductFromWishList({
      where: {
        userId: user.id,
        productId: body.productId,
      },
    });

    return SuccessResponse({ data: removeProduct, message: "Product removed" });
  } catch (error) {
    return handleApiErrors(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requiredToken(req);

    const removeProduct = await removeAllFromWishList({
      where: { userId: user.id },
    });

    return SuccessResponse({ data: removeProduct, message: "Product removed" });
  } catch (error) {
    return handleApiErrors(error);
  }
}
