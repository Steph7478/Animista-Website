import { Outlet, useLocation } from "react-router-dom";
import Header from "../../common/header";
import Footer from "../../common/footer";
import HeaderSecondary from "../../common/headerSecondary";

export default function MainLayout() {
  const location = useLocation();
  const isSpecialHeader =
    location.pathname === "/cookies" ||
    location.pathname === "/about" ||
    location.pathname === "/howto" ||
    location.pathname === "/advertise" ||
    location.pathname === "/download" ||
    location.pathname === "/license";

  return (
    <>
      {isSpecialHeader ? <HeaderSecondary /> : <Header />}
      <Outlet />
      <Footer />
    </>
  );
}
