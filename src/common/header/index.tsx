import { Link, NavLink } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { useAnimation } from "../../hooks/useAnimation";
import { FaFilter } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import SideBar from "../sidebar";

export default function Header() {
  const { animation, dispatch } = useAnimation();
  const [isFiltered, setIsFiltered] = useState(false);
  const navRef = useRef<HTMLUListElement | null>(null);

  type Favs = Record<string, string[]> | null;

  const totalFavs = useCallback((favs: Favs): number => {
    if (!favs) return 0;
    return Object.values(favs).reduce((acc, favs) => acc + favs.length, 0);
  }, []);

  const toggleFilter = useCallback(() => {
    setIsFiltered((prev) => !prev);
    dispatch({
      type: "SET",
      payload: {
        isFiltered: !isFiltered,
      },
    });
  }, [isFiltered, dispatch]);

  const deleteAllFavs = useCallback(() => {
    if (animation.favorites !== null) {
      const userConfirmed = window.confirm("Are you sure?");
      if (userConfirmed) {
        dispatch({
          type: "RESET",
        });
      }
    }
  }, [animation.favorites, dispatch]);

  const navbarLinks = [
    { to: "/play/basic", label: "Basic" },
    { to: "/play/entrances", label: "Entrances" },
    { to: "/play/exits", label: "Exits" },
    { to: "/play/text", label: "Text" },
    { to: "/play/attention", label: "Attention" },
    { to: "/play/background", label: "Background" },
  ];

  const scrollToItem = (index: number) => {
    const container = navRef.current;
    if (!container) return;

    const clickedItem = container.children[index] as HTMLElement | undefined;
    if (!clickedItem) return;

    const newScrollX = Math.min(
      clickedItem.offsetLeft - 12,
      container.scrollWidth - container.clientWidth,
    );

    container.scrollTo({ left: Math.max(0, newScrollX), behavior: "smooth" });
  };

  return (
    <div className="relative flex w-full flex-wrap items-center justify-start overflow-hidden bg-navbar font-text text-xs uppercase text-white md:h-[50px]">
      <div className="flex items-center pl-4">
        <img
          src="https://animista.net/images/animista-logo-small.svg"
          alt="Logo"
          className="h-4 w-4"
        />
      </div>

      <ul
        ref={navRef}
        className="ml-4 flex h-full items-center overflow-x-auto font-bold scrollbar-none xs:order-last xs:w-full md:-order-none md:w-auto"
      >
        {navbarLinks.map((link, index) => (
          <li key={link.to} className="flex h-full flex-shrink-0 items-center">
            <NavLink
              to={link.to}
              onClick={() => scrollToItem(index)}
              className={({ isActive }) =>
                `${isActive ? "cursor-default bg-lightred px-4 hover:opacity-100" : "hover:opacity-75"} rounded-sm px-3 py-2`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className={`ml-auto flex p-2 opacity-50 ${
          totalFavs(animation.favorites) === 0 ? "opacity-20" : "opacity-50"
        }`}
      >
        <span className="flex gap-x-1">
          {totalFavs(animation.favorites)}{" "}
          <FaHeart
            className={totalFavs(animation.favorites) !== 0 ? "heart" : ""}
          />
        </span>
      </div>

      <div
        className={`flex gap-x-[2px] brightness-[85%] ${
          totalFavs(animation.favorites) === 0
            ? "pointer-events-none opacity-50"
            : "pointer-events-auto"
        }`}
      >
        <button
          onClick={toggleFilter}
          className={`flex h-[30px] w-[30px] items-center justify-center rounded-sm hover:brightness-125 ${
            animation.isFiltered === true ? "bg-lightred" : "bg-icons"
          }`}
        >
          <FaFilter className="h-auto w-[10px]" />
        </button>

        <button
          onClick={deleteAllFavs}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-icons hover:brightness-125"
        >
          <FaTrash className="h-auto w-[10px]" />
        </button>

        <Link
          to={"/download"}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-sm bg-icons hover:brightness-125"
        >
          <MdDownload className="h-auto w-[15px]" />
        </Link>
      </div>

      <SideBar />
    </div>
  );
}
