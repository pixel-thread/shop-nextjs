import { Product } from "../product";

type WishListProps = { productId: string };

export interface WishListI {
  wishListItems: Product[];
  addToWishList: (data: Product) => void;
  removeFromWishList: (data: WishListProps) => void;
  removeAllFromWishList: () => void;
  isLoadingWishList: boolean;
}
