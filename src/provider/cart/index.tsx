import { CartContext } from "@/context/cart";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CART_ENDPOINT } from "@/lib/constants/endpoints/cart";
import { CartContextType, CartT } from "@/types/context";
import http from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

type CartContextProps = Readonly<{ children: React.ReactNode }>;

type RemoveItemsFromCartT = { productId: string; quantity?: number };

export const CartProvider = ({ children }: CartContextProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isLoading, isFetching, data, refetch } = useQuery({
    queryKey: ["user", "cart", user?.id],
    queryFn: () => http.get<CartT[]>(CART_ENDPOINT.GET_USER_CART),
    enabled: !!user?.id,
    select: (res) => res?.data,
  });

  const { mutate: updateItemOnCart } = useMutation({
    mutationKey: ["user", "cart", user?.id],
    mutationFn: (data: RemoveItemsFromCartT) =>
      http.put(CART_ENDPOINT.PUT_UPDATE_ITEM_ON_CART, data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user", "cart", user?.id] });
        return data;
      }
    },
  });

  const { mutate: removeAllFromCart } = useMutation({
    mutationKey: ["user", "cart", user?.id],
    mutationFn: (data: RemoveItemsFromCartT) =>
      http.post(CART_ENDPOINT.DELETE_REMOVE_FROM_CART, data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user", "cart", user?.id] });
        toast({ title: data.message });
        return data;
      }
    },
  });

  const { mutate: addToCard } = useMutation({
    mutationKey: ["user", "cart", user?.id],
    mutationFn: (data: RemoveItemsFromCartT) =>
      http.post(CART_ENDPOINT.POST_ADD_TO_CART, data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user", "cart", user?.id] });
        toast({ title: data.message });
        return data;
      }
    },
  });

  const value: CartContextType = {
    cart: data || [],
    isLoadingCart: isLoading || isFetching,
    addToCard,
    updateItemOnCart: (data) => updateItemOnCart(data),
    removeAllFromCart: (data) => removeAllFromCart(data),
    refreshCart: refetch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
