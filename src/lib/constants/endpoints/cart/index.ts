import { EndpointT } from "@/types/endpoints";

type CartEndpointKeys =
  | "GET_USER_CART"
  | "DELETE_REMOVE_FROM_CART"
  | "PUT_UPDATE_ITEM_ON_CART"
  | "POST_ADD_TO_CART";

export const CART_ENDPOINT: EndpointT<CartEndpointKeys> = {
  GET_USER_CART: "/cart",
  PUT_UPDATE_ITEM_ON_CART: "/cart",
  POST_ADD_TO_CART: "/cart",
  DELETE_REMOVE_FROM_CART: "/cart/remove-all",
};
