import { Product } from "@/types/product";
import { create } from "zustand";

type ProductStore = {
  isQuickPreview: boolean;
  setIsQuickPreview: (data: boolean) => void;

  isPreview: boolean;
  setIsPreview: (data: boolean) => void;

  productId: string;
  setProductId: (data: string) => void;

  product: Product;
  setProduct: (data: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  isQuickPreview: false,
  product: {} as Product,
  setProduct: (data: Product) => set({ product: data }),
  setIsQuickPreview: (data: boolean) => set({ isQuickPreview: data }),
  productId: "",
  setProductId: (data: string) => set({ productId: data }),
  isPreview: false,
  setIsPreview: (data: boolean) => set({ isPreview: false || data }),
}));
