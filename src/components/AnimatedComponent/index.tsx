import { useAnimation } from "../../hooks/useAnimation";
import { JSX } from "react";

function AnimatedComponent() {
  const { animation } = useAnimation();

  if (!animation) return <div>Loading...</div>;

  const {
    selectedVariation,
    selectedObjectClass,
    duration,
    durationUnit,
    timingFunction,
    delay,
    delayUnit,
    isInfinite,
    iterationCount,
    direction,
    fillMode,
    selectedObjectName,
    steps,
    stepType,
  } = animation;

  const animationClass = `${selectedVariation} ${selectedObjectClass}`;

  const animationStyle: React.CSSProperties = {
    animationName: selectedVariation ?? undefined,
    animationDuration: `${duration}${durationUnit}`,
    animationTimingFunction: animation.isChecked
      ? `steps(${steps || 2}, ${stepType || "end"})`
      : (timingFunction ?? undefined),
    animationDelay: `${delay}${delayUnit}`,
    animationIterationCount: isInfinite ? "infinite" : iterationCount || 1,
    animationDirection: direction ?? undefined,
    animationFillMode: fillMode ?? undefined,
  };

  const key = `${selectedVariation}-${selectedObjectClass}`;

  const elements: Record<string, JSX.Element> = {
    image: (
      <img
        key={key}
        src="https://animista.net/images/venezia-bw-square-02.jpg"
        alt="Animista Animation"
        className={animationClass}
        style={animationStyle}
      />
    ),

    "svg logo": (
      <img
        key={key}
        src="https://animista.net/images/animista-logo-white.svg"
        alt="Animista Animation"
        className={animationClass}
        style={animationStyle}
      />
    ),

    button: (
      <button key={key} className={animationClass} style={animationStyle}>
        Animista
      </button>
    ),
    text: (
      <p key={key} className={animationClass} style={animationStyle}>
        Animista
      </p>
    ),
    letter: (
      <p key={key} className={animationClass} style={animationStyle}>
        A
      </p>
    ),
    "bg image": (
      <img
        key={key}
        src="https://animista.net/images/venezia-bw-square-04.jpg"
        alt="Background Image"
        className={animationClass}
        style={animationStyle}
      />
    ),
    "cover image": (
      <img
        key={key}
        src="https://animista.net/images/venezia-bw.jpg"
        alt="Cover Image"
        className={animationClass}
        style={animationStyle}
      />
    ),

    cube: (
      <div className="scene-cube">
        <div
          className={`${animationClass} text-[70px] text-white`}
          key={key}
          style={animationStyle}
        >
          <div className="cubeface cubefront">1</div>
          <div className="cubeface cubeback">2</div>
          <div className="cubeface cubeleft">3</div>
          <div className="cubeface cuberight">4</div>
          <div className="cubeface cubetop">5</div>
          <div className="cubeface cubebottom">6</div>
        </div>
      </div>
    ),
    "card (hor-flip)": (
      <div className="scene-card">
        <div
          className={`${animationClass} text-[70px] text-white`}
          style={animationStyle}
        >
          <div className="cardface cardfront rounded-lg">A</div>
          <div className="cardface cardback-hor rounded-lg">B</div>
        </div>
      </div>
    ),
    "card (ver-flip)": (
      <div className="scene-card">
        <div
          className={`${animationClass} text-[70px] text-white`}
          key={key}
          style={animationStyle}
        >
          <div className="cardface cardfront rounded-lg">A</div>
          <div className="cardface cardback-ver rounded-lg">B</div>
        </div>
      </div>
    ),
    "card (diag-1-flip)": (
      <div className="scene-card">
        <div
          className={`${animationClass} text-[70px] text-white`}
          key={key}
          style={animationStyle}
        >
          <div className="cardface cardfront rounded-lg">A</div>
          <div className="cardface cardback-diag-1 rounded-lg">B</div>
        </div>
      </div>
    ),
    "card (diag-2-flip)": (
      <div className="scene-card">
        <div
          className={`${animationClass} text-[70px] text-white`}
          key={key}
          style={animationStyle}
        >
          <div className="cardface cardfront rounded-lg">A</div>
          <div className="cardface cardback-diag-2 rounded-lg">B</div>
        </div>
      </div>
    ),
    "triangular prism": (
      <div className="scene-cube">
        <div
          className={`${animationClass} text-[70px] text-white`}
          key={key}
          style={animationStyle}
        >
          <div className="triangularface triangularfront">1</div>
          <div className="triangularface triangularleft">2</div>
          <div className="triangularface triangularright">3</div>
        </div>
      </div>
    ),

    default: (
      <div key={key} className={animationClass} style={animationStyle}></div>
    ),
  };

  const leftClass = [
    "bg gradient horizontal",
    "bg gradient vertical",
    "bg gradient diagonal",
    "bg flat color",
    "cover image",
  ].includes(selectedObjectName ?? "")
    ? "md:left-[0px]"
    : "md:left-[150px] xs:inset-0";
  return (
    <div
      className={`relative flex h-full w-full flex-grow items-center justify-center overflow-hidden ${leftClass}`}
    >
      {selectedObjectName && elements[selectedObjectName]
        ? elements[selectedObjectName]
        : elements.default}
    </div>
  );
}

export default AnimatedComponent;
