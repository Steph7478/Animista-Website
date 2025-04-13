import { useCallback, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import useEmojiPicker from "../../hooks/useEmojiPicker";
import { BsEmojiLaughing } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Coffee from "/src/assets/svg/paper-cup.png";

export default function Modal({
  toggleModal,
  modal,
}: {
  toggleModal: () => void;
  modal: boolean;
}) {
  const [price, setPrice] = useState<number | null>(null);
  const [activeCoffee, setActiveCoffee] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const {
    inputText,
    setInputText,
    isPickerOpen,
    setIsPickerOpen,
    emojiPickerJSX,
  } = useEmojiPicker();
  const [heartAnimation, setHeartAnimation] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeartAnimation(e.target.checked);
  };

  const coffeePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setPrice(null);
      return;
    }

    const priceValue = Math.floor(parseInt(value) * 5);
    setPrice(priceValue);
  };

  useEffect(() => {
    if ((!activeCoffee && price === null) || inputValue === "") {
      setActiveCoffee("1");
      setPrice(5);
    }
  }, [activeCoffee, price, inputValue]);

  const renderCoffee = useCallback(() => {
    const coffees = {
      1: 5,
      3: 15,
      5: 25,
    };

    return Object.entries(coffees).map(([key, value]) => (
      <span
        onClick={() => {
          setPrice(value);
          setActiveCoffee(key);
          setInputValue(key);
        }}
        key={key}
        className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border-[1px] border-red-200 font-bold text-lightred hover:border-lightred ${activeCoffee === key && price === value ? "border-0 bg-lightred text-white" : "bg-white text-lightred"}`}
      >
        {key}
      </span>
    ));
  }, [activeCoffee, price]);

  return (
    <>
      {modal && (
        <div
          onClick={toggleModal}
          className="fixed inset-0 h-full w-full"
        ></div>
      )}

      <div
        className={`fixed z-20 mb-2 flex flex-col items-center justify-start overflow-y-scroll rounded-lg bg-white p-5 shadow-lg transition-transform xs:bottom-0 xs:h-full xs:w-full md:bottom-[85px] md:right-5 md:h-[475px] md:w-[400px] ${modal ? "scale-100" : "scale-0"} origin-bottom-right overflow-x-hidden pb-20 duration-500 ease-in-out`}
      >
        <div className="xs:block md:hidden">
          <button
            className="group absolute right-2 top-5 h-10 w-10 p-2"
            onClick={toggleModal}
          >
            <span className="absolute flex h-[2px] w-[15px] rotate-[-45deg] justify-self-center bg-navbar transition-all duration-300 ease-in-out group-hover:rotate-0"></span>
            <span className="absolute flex h-[2px] w-[15px] rotate-[45deg] justify-self-center bg-navbar transition-all duration-300 ease-in-out group-hover:rotate-0"></span>
          </button>
        </div>

        <div className="flex flex-row self-start">
          <span className="py-5 pl-5 pr-2 text-xl font-bold">
            Kaufe Ana einen Kaffee
          </span>
          <span className="group relative self-center justify-self-center">
            <span className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-[1px] border-black bg-white text-xs text-black">
              ?
            </span>

            <span className="tooltip-out group-hover:tooltip-in pointer-events-none absolute right-0 top-full w-[250px] translate-x-[15%] bg-white px-6 py-4 text-sm text-black opacity-0 shadow-md shadow-gray-300 group-hover:opacity-100">
              Es ist eine freundliche Metapher, kein echter coffee. Jeder
              "coffee" kostet €5 und Sie können so viele kaufen, wie Sie möchten
            </span>
          </span>
        </div>

        <div className="mb-4 flex min-h-[75px] w-[320px] flex-row items-center justify-center gap-x-1 rounded-md border-[1px] border-red-200 bg-red-50">
          <span className="flex h-[40px] w-[50px] items-center justify-center text-[35px]">
            ☕
          </span>
          <span className="flex h-[40px] w-[40px] items-center justify-center font-bold text-gray-400">
            X
          </span>
          {renderCoffee()}
          <input
            placeholder="1C"
            className="h-[35px] w-[35px] rounded-lg border-[1px] border-gray-200 px-2"
            type="text"
            id="coffeePrice"
            value={inputValue || ""}
            onChange={coffeePrice}
          />
        </div>

        <div className="flex flex-col gap-y-4">
          <input
            id="socialName"
            placeholder="Name oder @deinsozial"
            className="h-[50px] w-[320px] rounded-lg bg-gray-100 px-4 font-semibold transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:bg-white focus:outline-lightred"
            type="text"
          />
          <div className="relative flex flex-col">
            <textarea
              value={inputText}
              id="commentaries"
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Sag etwas Nettes..."
              className="h-[120px] w-[320px] resize-none rounded-lg bg-gray-100 px-4 pt-2 font-semibold transition-colors duration-150 ease-in-out hover:bg-gray-200 focus:bg-white focus:outline-lightred"
            ></textarea>

            <div className="absolute bottom-2 right-2 flex flex-col gap-y-1">
              {isPickerOpen && emojiPickerJSX}
              <button
                className="self-end p-2"
                onClick={() => setIsPickerOpen(!isPickerOpen)}
              >
                <BsEmojiLaughing />
              </button>
            </div>
          </div>

          <label className="flex items-center justify-start gap-x-2">
            <input
              id="checkboxCoffee"
              type="checkbox"
              onChange={handleCheckboxChange}
              className="peer hidden"
            />

            <div
              className={`relative flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-md border-2 border-gray-400 transition-colors duration-150 ease-in-out peer-checked:border-0 peer-checked:bg-lightred`}
            >
              <span
                className={`${heartAnimation ? "block" : "hidden"} animate-fadeLeft z-10 text-white`}
              >
                ✓
              </span>
              {heartAnimation && (
                <div className="pointer-events-none absolute inset-0 w-[30px] -translate-x-[15px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`${i}-${heartAnimation}`}
                      className="heartCheckbox pointer-events-none"
                      style={{
                        opacity: 0,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 400}ms`,
                      }}
                    >
                      <FaHeart className="h-5 w-5 text-red-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <span className="text-sm">Mach das monatlich</span>

            <span className="group relative">
              <span className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border-[1px] border-black bg-white text-xs text-black">
                ?
              </span>

              <span className="tooltip-out group-hover:tooltip-in pointer-events-none absolute bottom-full left-0 w-[220px] -translate-x-1/2 bg-white px-6 py-4 text-sm text-black opacity-0 shadow-md shadow-gray-300 group-hover:opacity-100">
                Unterstütze monatlich und sei Teil von Anas kreativer Reise.
                Jederzeit kündbar
              </span>
            </span>
          </label>

          <button className="flex h-[45px] w-full items-center justify-center self-center rounded-full bg-lightred text-lg font-bold text-white transition-all duration-150 ease-in-out hover:bg-red-500">
            Unterstützen €{price ?? 5}
            {heartAnimation ? "/monat" : ""}
          </button>
        </div>

        <div className="mt-8 flex w-full flex-col self-start p-2">
          <span className="text-lg font-semibold uppercase text-gray-500">
            Neueste Supporter
          </span>
          <span className="translate-y-12 self-center font-semibold text-gray-500">
            Kein Kommentar verfügbar
          </span>
        </div>

        <Link
          to="https://buymeacoffee.com/ana"
          className="group sticky bottom-0 left-0 flex w-full translate-y-20 items-center justify-center gap-x-2 bg-white p-3 font-semibold text-gray-500"
        >
          <div className="flex w-[250px] items-center justify-center rounded-full bg-gray-100 p-2">
            <img src={Coffee} alt="coffee cup" className="h-4 w-4" />
            <span>buymeacoffee.com/ana</span>
          </div>
        </Link>
      </div>

      <div
        className={`z-30 flex h-[63px] w-[63px] cursor-pointer items-center justify-center justify-self-end rounded-full bg-red-500 brightness-125 ${modal ? "hover:scale-100 xs:hidden md:block" : "hover:scale-110"} fixed bottom-5 right-5 transition-transform duration-300 ease-in-out`}
        onClick={toggleModal}
      >
        {!modal && (
          <img
            src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
            alt="Buy Me A Coffee"
            className="h-[36px] w-[36px] transition-transform duration-150 ease-in-out"
          />
        )}
        {modal && (
          <FaChevronDown className="flex h-[18px] w-[18px] translate-y-[120%] self-center justify-self-center text-white transition-transform duration-150 ease-in-out" />
        )}
      </div>
    </>
  );
}
