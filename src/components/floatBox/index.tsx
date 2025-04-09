import { useState } from "react";

export default function FloatBox() {
  const [isCopied, setIsCopied] = useState(false);

  const floatbox = (title: string, text: string) => (
    <div
      className={`${
        isCopied
          ? "pointer-events-auto translate-y-0 opacity-100 duration-500"
          : "pointer-events-none opacity-0 duration-1000"
      } fixed right-5 top-5 z-50 flex h-auto w-[400px] flex-col justify-center gap-y-1 bg-copied p-[20px] text-white transition-all ease-in-out`}
    >
      <span className="text-sm font-bold uppercase">{title}</span>
      <span className="text-sm">{text}</span>

      <button
        onClick={() => setIsCopied(false)}
        className="group absolute right-0 top-0 z-30 flex h-12 w-12 items-center justify-center text-white"
      >
        <span className="absolute h-[2px] w-[15px] rotate-[-45deg] bg-white transition-all duration-300 ease-in-out group-hover:rotate-0"></span>
        <span className="absolute h-[2px] w-[15px] rotate-[45deg] bg-white transition-all duration-300 ease-in-out group-hover:rotate-0"></span>
      </button>
    </div>
  );

  return { floatbox, setIsCopied, isCopied };
}
