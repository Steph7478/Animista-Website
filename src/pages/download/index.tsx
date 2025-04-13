import { useFavorites } from "../../hooks/useFavorites";
import { UpdateCSS } from "../../hooks/useGeneratorCSS";
import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosCopy } from "react-icons/io";
import { MdDownload } from "react-icons/md";
import FloatBox from "../../components/floatBox";
import { Link } from "react-router-dom";

export default function Download() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { downloadFavs } = useFavorites();
  const keyframeCopy = useRef<HTMLDivElement | null>(null);
  const { isCopied, setIsCopied, floatbox } = FloatBox();
  const { generateCss, setGenerateCss, generateKeyframes } = UpdateCSS();
  const [currentFavs, setCurrentFavs] = useState(downloadFavs);

  const handleRemoveFavorite = (index: number) => {
    setCurrentFavs(currentFavs.filter((_, i) => i !== index));
  };

  const handleCopy = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText).then(() => {
        setIsCopied(true);
      });
    }
  };

  const handleDownload = () => {
    const cssContent = keyframeCopy.current?.textContent || "";
    const blob = new Blob([cssContent], { type: "text/css" });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "Animista.css",
    });
    a.click();
  };

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => setIsCopied(false), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isCopied, setIsCopied]);

  return (
    <div className="overflow-hidden bg-white font-text text-navbar xs:p-5 md:px-[15%] md:py-[10%]">
      {currentFavs.length === 0 ? (
        <div className="mb-[40px] flex h-screen w-full flex-col gap-5">
          <span className="text-[50px] uppercase">Awwwh!</span>
          <span className="text-[30px]">
            How about picking some animations first :{")"}
          </span>
          <Link
            to={"/"}
            className="group relative w-fit text-sm uppercase text-lightred"
          >
            go back
            <span className="absolute bottom-[-4px] left-0 h-[5%] w-full origin-top-left scale-0 bg-lightred transition-all duration-200 ease-out group-hover:scale-100"></span>
          </Link>
        </div>
      ) : (
        <>
          <span className="my-[25px] text-[50px]">DOWNLOAD</span>
          <div className="my-[40px]">
            <span className="xs:text-[20px] md:text-[30px]">
              These are picked up so far...
            </span>
            <div className="my-[25px] flex flex-wrap">
              {currentFavs.map((fav, index) => (
                <div
                  key={index}
                  className="m-2 flex h-[25px] flex-nowrap items-center justify-between gap-x-2 text-nowrap bg-bgcolor p-2 text-xs"
                >
                  {fav}
                  <span
                    onClick={() => handleRemoveFavorite(index)}
                    className="flex cursor-pointer items-center justify-center rounded-full text-[12px] transition-colors duration-150 ease-in-out hover:bg-lightred hover:text-white"
                  >
                    <IoIosClose className="h-[16px] w-[16px]" />
                  </span>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-y-[10px]">
              <span className="xs:text-sm md:text-base">
                You can remove animations from the download queue by clicking on
                the 'x' button. Worry not though – this will not remove them
                from your favourites list!
              </span>
              <Link
                to={"/"}
                className="group relative w-fit uppercase text-lightred"
              >
                Pick more animations
                <span className="absolute bottom-[-4px] left-0 h-[5%] w-full origin-top-left scale-0 bg-lightred transition-all duration-200 ease-out group-hover:scale-100"></span>
              </Link>
            </div>
          </div>

          <div className="mb-[40px]">
            <span className="xs:text-[20px] md:text-[30px]">
              Download options
            </span>
            <div className="my-[25px] flex flex-row gap-x-5 self-start">
              <label className="flex items-center space-x-2">
                <input
                  id="minifydownload"
                  className="peer hidden"
                  type="checkbox"
                  checked={generateCss.minify}
                  onChange={() =>
                    setGenerateCss((prevState) => ({
                      ...prevState,
                      minify: !prevState.minify,
                    }))
                  }
                />
                <div className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full border-2 border-gray-400 transition-colors duration-150 ease-in-out peer-checked:border-0 peer-checked:bg-copied">
                  <span
                    className={`${generateCss.minify ? "block" : "hidden"} animate-fadeLeft z-10 text-white`}
                  >
                    ✓
                  </span>
                </div>
                <button
                  onClick={() =>
                    setGenerateCss((prevState) => ({
                      ...prevState,
                      minify: !prevState.minify,
                    }))
                  }
                >
                  Minify
                </button>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  id="prefixerdownload"
                  className="peer mr-2 hidden"
                  type="checkbox"
                  checked={generateCss.autoprefixer}
                  onChange={() =>
                    setGenerateCss((prevState) => ({
                      ...prevState,
                      autoprefixer: !prevState.autoprefixer,
                    }))
                  }
                />
                <div className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full border-2 border-gray-400 transition-colors duration-150 ease-in-out peer-checked:border-0 peer-checked:bg-copied">
                  <span
                    className={`${generateCss.autoprefixer ? "block" : "hidden"} animate-fadeLeft z-10 text-white`}
                  >
                    ✓
                  </span>
                </div>
                <button
                  onClick={() =>
                    setGenerateCss((prevState) => ({
                      ...prevState,
                      autoprefixer: !prevState.autoprefixer,
                    }))
                  }
                >
                  Autoprefixer
                </button>
              </label>
            </div>
            <span className="xs:text-sm md:text-base">
              CSS minification and autoprefixer are on by default. You can turn
              those features off by unchecking them above.
            </span>
          </div>

          <div className="mt-[40px] flex flex-col">
            <span className="xs:text-[20px] md:text-[30px]">
              Generated code
            </span>
            <span className="mt-[25px] xs:text-sm md:text-base">
              CSS code below is free for personal and commercial usage and is
              licensed under{" "}
              <Link to={"/license"} className="text-lightred hover:underline">
                FreeBSD License.
              </Link>{" "}
              <br /> <br /> Like Animista? Support it!
            </span>
            <a href="https://buymeacoffee.com/ana" target="_blank">
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png"
                alt="buy me a coffee"
                className="my-3 h-[48px] w-[185px]"
              />
            </a>
          </div>

          <div
            ref={keyframeCopy}
            className="mt-[20px] flex h-[240px] w-[90%] flex-col gap-y-5 overflow-auto whitespace-pre-line bg-bgcolor p-[42px]"
          >
            {currentFavs.map((keyframe, index) => {
              const keyframes = generateKeyframes(
                keyframe,
                generateCss.minify,
                generateCss.autoprefixer,
              ) as unknown as string;
              return keyframes && <div key={index}>{keyframes}</div>;
            })}
          </div>

          <div className="my-[40px] flex gap-x-4 text-white">
            <div
              onClick={handleDownload}
              className="group relative flex h-[50px] w-[185px] cursor-pointer items-center justify-center overflow-hidden rounded-md bg-lightred px-[30px] py-[15px] text-[14px] uppercase"
            >
              <span className="z-10 flex items-center justify-center gap-x-2 font-semibold">
                download <MdDownload className="h-4 w-4" />
              </span>
              {floatbox(
                "Downloaded",
                "Look inside your downloads folder, 'animista.css' file should be there",
              )}
              <div className="absolute inset-0 h-full w-full origin-top scale-50 rounded-t-full bg-lightred opacity-0 brightness-125 backdrop-blur-none transition-all duration-75 group-hover:scale-100 group-hover:rounded-t-md group-hover:opacity-100 group-hover:backdrop-blur-md"></div>
            </div>

            <div
              onClick={() => handleCopy(keyframeCopy)}
              className="group relative flex h-[50px] w-[185px] cursor-pointer items-center justify-center overflow-hidden rounded-md bg-lightred px-[30px] py-[15px] text-start text-[14px]"
            >
              <span className="z-10 flex items-center justify-center gap-x-2 font-semibold uppercase">
                copy code <IoIosCopy className="h-4 w-4" />
              </span>
              {floatbox(
                "Css copied",
                "CSS code is copied to your clipboard. Go paste it somewhere!",
              )}
              <div className="absolute inset-0 h-full w-full origin-top scale-50 rounded-t-full bg-lightred opacity-0 brightness-125 backdrop-blur-none transition-all duration-75 group-hover:scale-100 group-hover:rounded-t-md group-hover:opacity-100 group-hover:backdrop-blur-sm"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
