import { EndpointT } from "@/types/endpoints";

/**
 * Admin users management endpoint keys.
 * Format: HTTP_METHOD_RESOURCE
 *
 * @property GET_USERS - Endpoint for retrieving users list
 */
type WishListEndpointKeys =
  | "GET_USER_WISH_LIST"
  | "POST_ADD_TO_WISH_LIST"
  | "PUT_REMOVE_FROM_WISH_LIST"
  | "DELETE_REMOVE_ALL_FROM_WISH_LIST";
/**
 * Admin users management API endpoints configuration.
 * Uses EndpointT generic type for type-safe endpoint definitions.
 *
 * @example
 * ```typescript
 * // Using the users list endpoint
 * const getUsersUrl = ADMIN_USERS_ENDPOINT.GET_USERS; // "/admin/users"
 * ```
 */
export const WISHLIST_ENDPOINT: EndpointT<WishListEndpointKeys> = {
  GET_USER_WISH_LIST: "/wish-list",
  POST_ADD_TO_WISH_LIST: "/wish-list",
  PUT_REMOVE_FROM_WISH_LIST: "/wish-list/",
  DELETE_REMOVE_ALL_FROM_WISH_LIST: "/wish-list",
};
