import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import { AuthProvider } from "./auth";
import { TQueryProvider } from "./query";
import { CookiesProvider } from "react-cookie";
import { RoleBaseRoute } from "@/route/protectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/Layout/Layout";
import { CartProvider } from "./cart";
import { WishlistProvider } from "./wishlist";

type MainProviderProps = Readonly<{ children: React.ReactNode }>;

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <CookiesProvider>
      <TQueryProvider>
        <AuthProvider>
          <RoleBaseRoute>
            <CartProvider>
              <WishlistProvider>
                <Layout>{children}</Layout>
                <QuickViewModal />
                <CartSidebarModal />
                <PreviewSliderModal />
              </WishlistProvider>
            </CartProvider>
            <Toaster />
          </RoleBaseRoute>
        </AuthProvider>
      </TQueryProvider>
    </CookiesProvider>
  );
};
