import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout/mainLayout";
import Play from "../pages/play";
import Cookies from "../pages/cookies";
import Advertise from "../pages/advertise";
import Download from "../pages/download";
import HowTo from "../pages/howto";
import About from "../pages/about";
import Privacy from "../pages/privacy";
import License from "../pages/license";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Play />} />
        <Route path="play/*" element={<Play />} />
        <Route path="about/" element={<About />} />
        <Route path="advertise/" element={<Advertise />} />
        <Route path="cookies/" element={<Cookies />} />
        <Route path="download/" element={<Download />} />
        <Route path="howto/" element={<HowTo />} />
        <Route path="privacy/" element={<Privacy />} />
        <Route path="license/" element={<License />} />
      </Route>
    </Routes>
  );
};
