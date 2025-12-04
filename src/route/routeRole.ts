import { RoleRoute } from "@/types/route";

export const routeRoles: RoleRoute[] = [
  {
    url: "/admin/*",
    role: ["SUPER_ADMIN", "ADMIN"],
    needAuth: true,
  },
  {
    url: "/",
    role: ["SUPER_ADMIN", "ADMIN", "USER"],
    needAuth: false,
  },
  {
    url: "/shop-without-sidebar/*",
    role: ["SUPER_ADMIN", "ADMIN", "USER"],
    needAuth: true,
    redirect: "/auth",
  },
  {
    url: "/contact/*",
    role: ["SUPER_ADMIN", "ADMIN", "USER"],
    needAuth: false,
  },
];

export const pageAccessOnlyIfUnAuthenticated: string[] = ["/signin", "/signup"];
