import { EndpointT } from "@/types/endpoints";

/**
 * Dashboard endpoint keys.
 * Format: HTTP_METHOD_RESOURCE
 *
 * @property GET_DASHBOARD - Main dashboard data endpoint
 */
type ProductEndpointKey = "GET_PRODUCT" | "GET_PRODUCT_BY_ID";

/**
 * Dashboard API endpoints configuration.
 * Uses EndpointT generic type for type-safe endpoint definitions.
 *
 * @example
 * ```typescript
 * // Using the dashboard endpoint
 * const dashboardUrl = DASHBOARD_ENDPOINT.GET_DASHBOARD; // "/dashboard"
 * ```
 */
export const PRODUCT_ENDPOINT: EndpointT<ProductEndpointKey> = {
  GET_PRODUCT: "/product?page=:page",
  GET_PRODUCT_BY_ID: "/product/:id",
};
