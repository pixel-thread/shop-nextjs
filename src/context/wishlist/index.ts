import { WishListI } from "@/types/wishlist";
import React from "react";

export const WishListContext = React.createContext<WishListI | null>(null);
