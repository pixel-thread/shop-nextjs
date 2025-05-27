import { CartContextType } from "@/types/context";
import React from "react";

export const CartContext = React.createContext<CartContextType | null>(null);
