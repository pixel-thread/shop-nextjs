import { Product } from "../product";

type CartProps = {
  productId: string;
  quantity?: number;
};

export interface CartT extends Product {
  quantity: number;
}

export type CartContextType = {
  cart: CartT[];
  isLoadingCart: boolean;
  addToCard: ({ productId, quantity }: CartProps) => void;
  updateItemOnCart: (data: CartProps) => void;
  removeAllFromCart: (data: CartProps) => void;
  refreshCart: () => void;
};
