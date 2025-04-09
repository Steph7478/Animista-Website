export const selectOptions = {
  object: {
    "2D objects": [
      {
        name: "box dark",
        className: " h-[160px] w-[160px] bg-navbar",
      },
      {
        name: "box light",
        className: " h-[160px] w-[160px] bg-white",
      },
      {
        name: "circle",
        className: " h-[160px] w-[160px] bg-navbar rounded-full",
      },
      {
        name: "image",
        className: "h-[280px] w-[280px] bg-cover border-white border-[15px]",
      },
      {
        name: "button",
        className:
          " animatedbutton h-[70px] w-[240px] bg-navbar rounded-full text-white text-xl font-bold uppercase",
      },
      {
        name: "text",
        className: " text-bgnavbar text-[60px] font-bold",
      },
      {
        name: "letter",
        className: " text-white text-[100px] font-bold",
      },
      {
        name: "bg gradient horizontal",
        className: "bg-gradient-horizontal w-full h-full ",
      },
      {
        name: "bg gradient vertical",
        className: "bg-gradient-vertical w-full h-full ",
      },
      {
        name: "bg gradient diagonal",
        className: "bg-gradient-diagonal w-full h-full ",
      },
      {
        name: "bg flat color",
        className: "bg-navbar w-full h-full",
      },
      {
        name: "bg image",
        className: "w-[515px] h-[335px] border-white border-[15px]",
      },
      {
        name: "cover image",
        className: "bg-cover w-full h-full",
      },
    ],
    "3D objects": [
      { name: "card (hor-flip)", className: "animationbody" },
      { name: "card (ver-flip)", className: "animationbody" },
      { name: "card (diag-1-flip)", className: "animationbody" },
      { name: "card (diag-2-flip)", className: "animationbody" },
      { name: "cube", className: "animationbody" },
      { name: "triangular prism", className: "animationbody" },
    ],
    SVG: [{ name: "svg logo", className: "h-[280px] w-[280px] invert" }],
  },

  timing: {
    Native: [
      { name: "linear", className: "timing-linear" },
      { name: "ease", className: "timing-ease" },
      { name: "easeIn", className: "timing-easeIn" },
      { name: "easeOut", className: "timing-easeOut" },
      { name: "easeInOut", className: "timing-easeInOut" },
    ],
    "Penner Equations": [
      { name: "easeInQuad", className: "timing-easeInQuad" },
      { name: "easeInCubic", className: "timing-easeInCubic" },
      { name: "easeInQuart", className: "timing-easeInQuart" },
      { name: "easeInQuint", className: "timing-easeInQuint" },
      { name: "easeInSine", className: "timing-easeInSine" },
      { name: "easeInExpo", className: "timing-easeInExpo" },
      { name: "easeInCirc", className: "timing-easeInCirc" },
      { name: "easeInBack", className: "timing-easeInBack" },
    ],
  },
  stepType: ["end", "start"],
  delayUnit: ["s", "ms"],
  durationUnit: ["s", "ms"],
  direction: ["normal", "reverse", "alternate", "alternate-reverse"],
  fillMode: ["none", "forwards", "backwards", "both"],
};
