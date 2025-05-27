import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishListStoreT = {
  wishListItems: Product[];
  setWishListItems: (data: Product[]) => void;
  addToWishList: (item: Product) => void;
  removeFromWishList: (productId: string) => void;
  removeAllFromWishList: () => void;
};

export const useWishListStore = create<WishListStoreT>()(
  persist(
    (set, get) => ({
      wishListItems: [],
      setWishListItems: (data: Product[]) => set({ wishListItems: data }),
      addToWishList: (item: Product) => {
        const existing = get().wishListItems.find((i) => i.id === item.id);
        if (!existing) {
          set({ wishListItems: [...get().wishListItems, item] });
        }
      },
      removeFromWishList: (productId: string) => {
        set({
          wishListItems: get().wishListItems.filter(
            (item) => item.id !== productId,
          ),
        });
      },
      removeAllFromWishList: () => set({ wishListItems: [] }),
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ wishListItems: state.wishListItems }),
    },
  ),
);
