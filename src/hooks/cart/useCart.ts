import { CartContext } from "@/context/cart";
import React from "react";

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context)
    throw new Error("CartContext must be used within a CartProvider");
  return context;
}
