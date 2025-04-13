import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import { animationDetail } from "../../data/Animations";
import { useAnimation } from "../../hooks/useAnimation";
import AnimatedComponent from "../../components/AnimatedComponent";
import { CiRedo } from "react-icons/ci";
import { TbCodeDots } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import Options from "../../components/Selector";
import { useNavigation } from "../../hooks/useNavigation";
import { useFavorites } from "../../hooks/useFavorites";
import { useScroll } from "../../hooks/useScroll";
import Modal from "../../components/coffeeModal";
import useToggleModal from "../../hooks/useModal";
import FloatBox from "../../components/floatBox";
import { IoMdSettings } from "react-icons/io";
import CssModal from "../../components/cssGeneratorModal";

export default function Play() {
  const { modal, toggleModal } = useToggleModal();

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollRefSecondary = useRef<HTMLDivElement>(null);

  const [showSettings, setShowSettings] = useState(false);

  const [animationStyle, setAnimationStyle] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const { animation } = useAnimation();

  const [replay, setreplay] = useState(0);

  const { floatbox, setIsCopied, isCopied } = FloatBox();

  const [isFirstFiltered, setIsFirstFiltered] = useState(true);

  const {
    detail,
    navigateAndUpdateState,
    menu,
    categories,
    options,
    pathSegments,
    handleOptionsClick,
    handleAnimationClick,
  } = useNavigation(setAnimationStyle);

  const { favoriteCounts, toggleHeart, favs, toggleFavorite } =
    useFavorites(categories);

  const filteredMenuItems = useMemo(() => {
    return animation.isFiltered
      ? animationDetail[menu]?.filter((item) => favs.includes(item.name))
      : animationDetail[menu];
  }, [animation.isFiltered, favs, menu]);

  const filteredDetailItems = useMemo(() => {
    return animation.isFiltered
      ? detail?.filter((item) => favs.includes(item))
      : detail;
  }, [animation.isFiltered, detail, favs]);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging,
  } = useScroll(
    scrollRef,

    filteredMenuItems,
    pathSegments,
    setAnimationStyle,
  );

  const [delayClass, setDelayClass] = useState({
    button1: "",
    button2: "",
    button3: "",
    button4: "",
  });

  const handleDelay = useCallback((newState: boolean) => {
    if (newState) {
      setDelayClass({
        button1: "delay-[900ms]",
        button2: "delay-[800ms]",
        button3: "delay-[700ms]",
        button4: "delay-[900ms]",
      });
    } else {
      setTimeout(() => {
        setDelayClass({
          button1: "delay-0s",
          button2: "delay-0s",
          button3: "delay-0s",
          button4: "delay-0s",
        });
      }, 600);
    }
  }, []);

  useEffect(() => {
    if (
      animation.isFiltered &&
      filteredMenuItems.length > 0 &&
      isFirstFiltered
    ) {
      const firstFilteredItem = filteredMenuItems[0];
      const firstFilteredOption = firstFilteredItem?.options?.[0] || "";

      if (firstFilteredItem && firstFilteredOption) {
        navigateAndUpdateState(
          menu,
          firstFilteredItem.name,
          firstFilteredOption,
        );
        setIsFirstFiltered(false);
      }
    }
  }, [
    animation.isFiltered,
    filteredMenuItems,
    menu,
    navigateAndUpdateState,
    isFirstFiltered,
  ]);

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isCopied, setIsCopied]);

  useEffect(() => {
    handleDelay(isOpen || showSettings);
  }, [handleDelay, isOpen, showSettings]);

  return (
    <>
      <div className="overflow-hidden bg-white font-text shadow-lg shadow-gray-200">
        <div
          ref={scrollRef}
          className={`drag-scroll flex w-full cursor-grab flex-nowrap items-center gap-x-2 overflow-x-auto border-[1px] border-gray-200 p-4 text-center text-sm transition-all duration-300 ease-in-out scrollbar-none ${isDragging ? "cursor-grabbing" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {menu &&
            filteredMenuItems &&
            filteredMenuItems.map((animation) => {
              const isActive = pathSegments[2] === animation.name;
              const favoriteCount = favoriteCounts.counts[animation.name] || 0;

              return (
                <div
                  key={animation.name}
                  style={{
                    ...animationStyle,
                  }}
                  onClick={() => {
                    handleAnimationClick(animation.name);
                    setIsOpen(false);
                  }}
                  className={`${
                    isActive ? "bg-lightred" : "bg-navbar"
                  } group relative flex min-w-[110px] cursor-pointer select-none items-center justify-center overflow-hidden rounded-full text-xs font-bold uppercase text-white xs:h-[30px] xs:flex-shrink-0 xs:text-nowrap xs:px-4 md:h-[110px] md:flex-shrink md:text-wrap md:px-[10px]`}
                >
                  <span className="relative z-10 xs:flex-shrink-0 md:flex-shrink">
                    {animation.name}
                  </span>
                  {!isActive && (
                    <div className="absolute inset-0 h-full w-full origin-center scale-0 rounded-full bg-navbar brightness-125 transition-all duration-[400ms] group-hover:scale-100"></div>
                  )}
                  {favoriteCount > 0 && (
                    <span className="top-5 z-10 flex-shrink-0 text-sm text-white opacity-50 xs:static xs:pl-2 md:absolute md:pl-0">
                      {favoriteCount} ♥
                    </span>
                  )}
                </div>
              );
            })}
        </div>

        {filteredDetailItems && (
          <div
            className={`animate-fade-slide-down w-full overflow-auto p-3 text-center scrollbar-none xs:flex xs:flex-nowrap md:grid md:grid-cols-5`}
            key={pathSegments[2]}
            ref={scrollRefSecondary}
          >
            {filteredDetailItems.map((options, index) => {
              const isActive = pathSegments[3] === options;
              const isoptionsFavorite = toggleHeart(options);

              return (
                <div
                  key={options}
                  style={{
                    animationDelay: `${Math.floor(index / 5) * 0.4}s`,
                  }}
                  onClick={() => {
                    handleOptionsClick(options, scrollRefSecondary, index);
                    setIsOpen(false);
                  }}
                  className={`${
                    isActive
                      ? "cursor-default bg-lightred font-bold text-white hover:opacity-100"
                      : "cursor-pointer hover:text-red-600 hover:opacity-75"
                  } animate-fade-slide-down group relative select-none text-[15px] transition-all duration-200 ease-in-out xs:flex-shrink-0 xs:rounded-full xs:px-5 xs:py-1 md:rounded-sm md:p-1`}
                >
                  {options}{" "}
                  {isoptionsFavorite && (
                    <span
                      className={`${isActive ? "text-white" : "text-navbar group-hover:text-lightred"}`}
                    >
                      ♥
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={`relative flex h-full w-full flex-shrink-0 items-center justify-center overflow-y-auto overflow-x-hidden scrollbar-none`}
      >
        <CssModal isOpen={isOpen} setIsOpen={setIsOpen} />

        <button
          onClick={() => {
            setShowSettings(true);
          }}
          className={`justify-cente absolute left-0 top-0 z-20 m-5 flex h-[40px] w-[40px] items-center rounded-full bg-white transition-transform duration-150 ease-in-out xs:block md:hidden ${
            isOpen || showSettings
              ? "-translate-y-[100px] delay-100"
              : `translate-y-0 ${delayClass.button4}`
          }`}
        >
          <IoMdSettings className="h-[25px] w-full" />
        </button>
        <div
          className={`${!isOpen ? "md:translate-x-0" : "md:-translate-x-[105%]"} absolute z-20 overflow-y-auto overflow-x-hidden transition-all delay-300 duration-700 ease-in-out scrollbar-none xs:inset-0 xs:h-full xs:w-full md:left-0 md:top-0 md:h-full md:w-[300px] ${!showSettings ? "xs:-translate-x-[105%]" : "xs:translate-x-0"}`}
        >
          <Options setShowSettings={setShowSettings} />
        </div>
        <AnimatedComponent key={replay} />
        <div className={`absolute right-0 top-0 m-5 flex gap-2`}>
          <button
            onClick={() => {
              setreplay((prevKey) => prevKey + 1);
            }}
            className={`shadow-xs group flex h-[40px] w-[40px] transform items-center justify-center rounded-full bg-white shadow-black transition-transform duration-500 hover:scale-110 hover:duration-150 active:scale-[85%] ${
              isOpen || showSettings
                ? "-translate-y-[100px] delay-200"
                : `translate-y-0 ${delayClass.button1}`
            }`}
          >
            <CiRedo className="animate-rotate-back group-hover:options-icons h-full w-full stroke-1 p-[10px] transition-all duration-150" />
          </button>

          <button
            onClick={() => toggleFavorite(categories, options)}
            className={`shadow-xs group flex h-[40px] w-[40px] transform items-center justify-center rounded-full bg-white shadow-black transition-transform duration-500 hover:scale-110 hover:duration-150 active:scale-[85%] ${
              isOpen || showSettings
                ? "-translate-y-[100px] delay-150"
                : `translate-y-0 ${delayClass.button2}`
            }`}
          >
            <FaHeart
              className={`h-[15px] w-full ${
                toggleHeart(options)
                  ? "fill-navbar"
                  : "fill-transparent stroke-navbar stroke-[50px]"
              } group-hover:icongrow origin-center transition-all duration-300 ease-in-out`}
            />
          </button>

          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className={`shadow-xs group flex h-[40px] w-[40px] transform items-center justify-center rounded-full bg-white shadow-black transition-transform duration-500 hover:scale-110 hover:duration-150 active:scale-[85%] ${
              isOpen || showSettings
                ? "-translate-y-[100px] delay-100"
                : `translate-y-0 ${delayClass.button3}`
            }`}
          >
            <TbCodeDots className="group-hover:icongrow h-[20px] w-[20px] transition-all duration-300 ease-in-out" />
          </button>
        </div>
      </div>
      {floatbox(
        "Css copied",
        "    CSS code is copied to your clipboard. Go paste it somewhere!",
      )}
      <Modal toggleModal={toggleModal} modal={modal} />
    </>
  );
}
