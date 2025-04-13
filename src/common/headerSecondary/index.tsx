import { Link } from "react-router-dom";
import SideBar from "../sidebar";

export default function HeaderSecondary() {
  return (
    <div className="relative flex h-[50px] w-full items-center justify-center bg-navbar pl-4 text-white">
      <Link to={"/"} className="absolute">
        <img
          src="https://animista.net/images/animista-logo-white.svg"
          alt="Logo"
          className="w-24"
        />
      </Link>
      <div className="ml-auto">
        <SideBar />
      </div>
    </div>
  );
}
