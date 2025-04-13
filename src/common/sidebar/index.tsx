import { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const sidebarLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/howto", label: "How to" },
    { to: "/download", label: "Download" },
    { to: "/advertise", label: "Advertise" },
  ];
  return (
    <div>
      <div
        className={`${
          isOpen
            ? "group absolute right-0 top-0 z-50 flex h-12 w-12 items-center justify-center bg-navbar text-white hover:cursor-pointer"
            : "hover:menuhover flex h-full w-[40px] scale-[70%] flex-col items-center justify-center gap-y-[4px] p-[10px]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${
            isOpen
              ? "absolute h-[2px] w-[15px] rotate-[-45deg] bg-white transition-all duration-300 ease-in-out group-hover:rotate-0"
              : "bg-white px-[10px] py-[2px] transition-all duration-300 ease-in-out"
          }`}
        ></span>
        <span
          className={`${isOpen ? "hidden" : "bg-white px-[10px] py-[2px]"} transition-all duration-500 ease-in-out`}
        ></span>
        <span
          className={`${
            isOpen
              ? "absolute h-[2px] w-[15px] rotate-[45deg] bg-white transition-all duration-300 ease-in-out group-hover:rotate-0"
              : "bg-white px-[10px] py-[2px] transition-all duration-300 ease-in-out"
          }`}
        ></span>
      </div>

      <div>
        <div
          className={`fixed inset-0 z-40 h-full w-full bg-black transition-opacity duration-500 ${
            isOpen
              ? "pointer-events-auto opacity-70"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        ></div>
        <div
          className={`fixed bottom-0 right-0 z-40 flex h-full bg-white shadow-md shadow-black transition-transform duration-500 ease-out xs:w-full md:w-[50%] ${
            isOpen ? "translate-x-0" : "translate-x-[105%] ease-in"
          }`}
        >
          <div className="relative m-[46px] flex h-[85%] w-full flex-col items-center justify-start border-[1px] border-gray-400 p-16">
            <Link to={"/"}>
              <img
                src="https://animista.net/images/animista-logo-white.svg"
                alt=""
                className="mb-8 mt-2 h-8 w-full invert"
              />
            </Link>
            <ul className="my-auto">
              {sidebarLinks.map((sidelinks) => (
                <li
                  key={sidelinks.to}
                  className="group flex h-8 items-center justify-center p-[20px] font-text text-lg uppercase text-gray-500"
                >
                  <NavLink
                    className="group relative transition-all duration-300 ease-in-out"
                    to={sidelinks.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {sidelinks.label}
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-[120%] group-hover:-translate-x-1/2"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center justify-center">
              <span className="mt-auto text-sm text-gray-500">
                Follow Animista
              </span>
              <a target="_blank" href={"/https://x.com/cssanimista"}>
                {" "}
                <FaTwitter className="mt-3 h-9 w-9 self-center justify-self-center invert transition-all duration-300 ease-in-out hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
