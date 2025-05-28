import { CartT } from "./context";

export const totalProductPrice = (items: CartT[]) => {
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};
