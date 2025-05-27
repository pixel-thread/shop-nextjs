import ScrollToTop from "../Common/ScrollToTop";
import Footer from "../Footer";
import Header from "../Header";

export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <ScrollToTop />
      <Footer />
    </>
  );
};
