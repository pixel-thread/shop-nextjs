import { create } from "zustand";

interface CartStoreT {
  isCartOpen: boolean;
  onOpenValueChange: (value: boolean) => void;
}

export const useCartStore = create<CartStoreT>((set) => ({
  isCartOpen: false,
  onOpenValueChange: (value: boolean) => set({ isCartOpen: value }),
}));
