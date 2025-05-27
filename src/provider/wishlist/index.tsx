import { WishListContext } from "@/context/wishlist";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/use-toast";
import { WISHLIST_ENDPOINT } from "@/lib/constants/endpoints/wishlist";
import { useWishListStore } from "@/store/wishlist/useWishListStore";
import { Product as WishListT } from "@/types/product";
import { WishListI } from "@/types/wishlist";
import http from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

type WishListProviderProps = Readonly<{ children: React.ReactNode }>;

type RemoveItemsFromWishListT = { productId: string };

export const WishlistProvider = ({ children }: WishListProviderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const {
    wishListItems,
    removeFromWishList: removeFromStorage,
    addToWishList: addToStorage,
    removeAllFromWishList: removeAllFromStorage,
  } = useWishListStore();

  const queryClient = useQueryClient();

  const isLogin = !!user?.id;

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["user", "wish", "list", user?.id],
    queryFn: () => http.get<WishListT[]>(WISHLIST_ENDPOINT.GET_USER_WISH_LIST),
    enabled: !!user?.id,
    select: (res) => res.data,
  });

  const { mutate: mutateRemove, isPending: isPendingRemove } = useMutation({
    mutationKey: ["user", "wish", "list", user?.id],
    mutationFn: (data: RemoveItemsFromWishListT) =>
      http.put(WISHLIST_ENDPOINT.PUT_REMOVE_FROM_WISH_LIST, data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["user", "wish", "list", user?.id],
        });
        return data;
      }
    },
  });

  const { mutate: mutateRemoveAll, isPending: isPendingRemoveAll } =
    useMutation({
      mutationKey: ["user", "wish", "list", user?.id],
      mutationFn: () =>
        http.delete(WISHLIST_ENDPOINT.DELETE_REMOVE_ALL_FROM_WISH_LIST),
      onSuccess: (data) => {
        if (data.success) {
          queryClient.invalidateQueries({
            queryKey: ["user", "wish", "list", user?.id],
          });
          toast({ title: data.message });
          return data;
        }
      },
    });

  const { mutate: mutateAdd, isPending: isPendingAdd } = useMutation({
    mutationKey: ["user", "wish", "list", user?.id],
    mutationFn: (data: RemoveItemsFromWishListT) =>
      http.post(WISHLIST_ENDPOINT.POST_ADD_TO_WISH_LIST, data),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["user", "wish", "list", user?.id],
        });
        toast({ title: data.message });
        return data;
      }
    },
  });

  const loading =
    isLoading ||
    isFetching ||
    isPendingAdd ||
    isPendingRemove ||
    isPendingRemoveAll;

  const removeFromWishList = (data: RemoveItemsFromWishListT) => {
    if (!isLogin) {
      removeFromStorage(data.productId);
      return;
    }
    mutateRemove(data);
    return;
  };

  const addToWishList = (data: WishListT) => {
    if (!isLogin) {
      addToStorage(data);
      return;
    }
    mutateAdd({ productId: data.id });
    return;
  };

  const removeAllFromWishList = () => {
    if (!isLogin) {
      removeAllFromStorage();
      return;
    }
    mutateRemoveAll();
    return;
  };

  const value: WishListI = {
    wishListItems: !isLogin ? wishListItems : data || [],
    addToWishList,
    removeFromWishList,
    removeAllFromWishList,
    isLoadingWishList: loading,
  };
  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};
