import { useAuth } from "@/hooks/auth/useAuth";
import { usePathname } from "next/navigation";
import { Ternary } from "../Common/Ternary";
import { UserLayout } from "./UserLayout";
import AdminLayout from "./AdminLayout";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const pathName = usePathname();
  const isAdminPath = pathName.startsWith("/admin");
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  return (
    <Ternary
      condition={isAdminPath && isAdmin}
      ifTrue={<AdminLayout>{children}</AdminLayout>}
      ifFalse={<UserLayout>{children}</UserLayout>}
    />
  );
};
