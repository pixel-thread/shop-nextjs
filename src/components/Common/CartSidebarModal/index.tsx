"use client";
import React, { useCallback } from "react";

import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";
import { useCartStore } from "@/store/cart/useCartStore";
import { useCart } from "@/hooks/cart/useCart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const CartSidebarModal = () => {
  const { cart: cartItems, isLoadingCart } = useCart();

  const { isCartOpen: isCartModalOpen, onOpenValueChange } = useCartStore();

  const closeCartModal = useCallback(
    () => onOpenValueChange(false),
    [onOpenValueChange],
  );

  // add all items price
  const totalPrice = "TODO";

  if (isLoadingCart) {
    return null;
  }
  return (
    <Sheet
      defaultOpen={false}
      onOpenChange={onOpenValueChange}
      open={isCartModalOpen}
    >
      <SheetContent side="right">
        <div className="flex items-center justify-end">
          <div className="w-full max-w-[500px]  sm:px-7.5 relative">
            <SheetHeader className="flex items-center justify-between pb-7 border-b border-gray-3 mb-7.5">
              <SheetTitle className="font-medium text-dark text-lg sm:text-2xl">
                Cart View
              </SheetTitle>
            </SheetHeader>

            <div className="h-[66vh] overflow-y-auto no-scrollbar">
              <div className="flex flex-col gap-6">
                {/* <!-- cart item --> */}
                {cartItems.length > 0 ? (
                  cartItems.map((item, key) => (
                    <SingleItem key={key} item={item.product} />
                  ))
                ) : (
                  <EmptyCart />
                )}
              </div>
            </div>

            <div className="border-t border-gray-3 bg-white pt-5 pb-4 sm:pb-7.5 lg:pb-11 mt-7.5 sticky bottom-0">
              <div className="flex items-center justify-between gap-5 mb-6">
                <p className="font-medium text-xl text-dark">Subtotal:</p>

                <p className="font-medium text-xl text-dark">${totalPrice}</p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  onClick={() => closeCartModal()}
                  href="/cart"
                  className="w-full flex justify-center font-medium text-white bg-blue py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
                >
                  View Cart
                </Link>

                <Link
                  href="/checkout"
                  className="w-full flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebarModal;
