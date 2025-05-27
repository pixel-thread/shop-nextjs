import { WishListContext } from "@/context/wishlist";
import React from "react";

export function useWishlist() {
  const context = React.useContext(WishListContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishListProvider");
  }
  return context;
}
