import { useMemo, useCallback, SetStateAction, Dispatch } from "react";
import { selectOptions } from "../../data/Options";
import { useAnimation } from "../../hooks/useAnimation";
import { FaChevronDown } from "react-icons/fa";

interface OptionsProps {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

export default function Options({ setShowSettings }: OptionsProps) {
  const { animation, setAnimation } = useAnimation();

  const handleChange = useCallback(
    (key: keyof typeof animation) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        if (e.target.type === "checkbox") {
          setAnimation({ [key]: e.target.checked });
        } else {
          setAnimation({ [key]: value });
        }
      },
    [setAnimation],
  );

  const handleSelectChange = useCallback(
    (key: keyof typeof animation) =>
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.selectedOptions[0];
        const selectedName = selectedOption.text;
        setAnimation({
          [key]: selectedName,
          ...(key &&
            key === "selectedObjectName" && {
              selectedObjectName: selectedName,
            }),
        });
      },
    [setAnimation],
  );

  const memoizedSelectOptions = useMemo(
    () => ({
      objectOptions: selectOptions.object,
      timingOptions: selectOptions.timing,
      stepTypeOptions: selectOptions.stepType,
      delayUnitOptions: selectOptions.delayUnit,
      directionOptions: selectOptions.direction,
      fillModeOptions: selectOptions.fillMode,
      durationUnitOptions: selectOptions.durationUnit,
    }),
    [],
  );

  const renderSelect = useCallback(
    (
      label: string,
      options: Record<string, { name: string; className: string }[]> | string[],
      value: string,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
      id: string,
    ) => (
      <div>
        <label htmlFor={id} className="block text-xs text-gray-500">
          {label}
        </label>
        <div className="relative">
          <select
            id={id}
            className="h-[28px] w-full appearance-none bg-bgcolor px-2 text-sm font-semibold text-navbar focus:outline-none focus:ring-0"
            value={value}
            onChange={onChange}
          >
            {Array.isArray(options)
              ? options.map((opt, index) => (
                  <option
                    className="font-semibold"
                    key={`${label}-${index}`}
                    value={opt}
                  >
                    {opt}
                  </option>
                ))
              : Object.entries(options).map(([group, opts], idx) => (
                  <optgroup
                    className="bg-navbar font-semibold text-white"
                    key={`${label}-${idx}`}
                    label={group}
                  >
                    {opts.map((opt, index) => (
                      <option
                        className="bg-white font-semibold text-navbar"
                        key={`${label}-${opt.name}-${index}`}
                        value={opt.name}
                      >
                        {opt.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
          </select>
          <FaChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-600"
            size={10}
          />
        </div>
      </div>
    ),
    [],
  );

  const renderCheckbox = useCallback(
    (
      label: string,
      checked: boolean,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
      id: string,
    ) => (
      <div
        className={`${id === "infinite" ? "flex justify-start xs:basis-[41%] md:basis-[44%]" : ""}`}
      >
        <label className="flex items-center gap-1 text-xs">
          <span className="flex h-[14px] w-[14px] items-center justify-center rounded-sm border-2 border-gray-400 peer-checked:bg-black peer-checked:text-white">
            <span className={`${checked ? "block" : "hidden"}`}>✓</span>
          </span>
          <input
            id={id}
            type="checkbox"
            checked={checked ?? false}
            onChange={onChange}
            className="hidden"
          />
          {label}
        </label>
      </div>
    ),
    [],
  );

  return (
    <form className="shadow-xs relative z-20 m-5 bg-white p-5 font-text text-navbar shadow-black">
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowSettings(false);
        }}
        className="group absolute right-0 top-0 h-10 w-10 p-2 xs:block md:hidden"
      >
        <span className="absolute flex h-[2px] w-[15px] rotate-[-45deg] justify-self-center bg-navbar transition-all duration-300 ease-in-out group-hover:rotate-0"></span>
        <span className="absolute flex h-[2px] w-[15px] rotate-[45deg] justify-self-center bg-navbar transition-all duration-300 ease-in-out group-hover:rotate-0"></span>
      </button>
      <legend className="text-sm font-semibold uppercase">Options</legend>
      <fieldset className="space-y-2">
        {renderSelect(
          "Select object",
          memoizedSelectOptions.objectOptions,
          animation.selectedObjectName || "",
          handleSelectChange("selectedObjectName"),
          "select-object",
        )}
        <div>
          <label htmlFor="duration" className="block text-xs text-gray-500">
            Duration
          </label>
          <div className="relative flex gap-2">
            <input
              id="duration"
              type="text"
              className="h-[28px] w-full bg-bgcolor px-2 text-sm font-semibold text-navbar placeholder:font-semibold"
              placeholder="Duration in sec"
              value={animation.duration || ""}
              onChange={handleChange("duration")}
            />
            <select
              id="duration-unit"
              className="h-[28px] w-[40%] appearance-none bg-bgcolor px-2 text-sm font-semibold text-navbar focus:outline-none focus:ring-0"
              value={animation.durationUnit || ""}
              onChange={handleSelectChange("durationUnit")}
            >
              {memoizedSelectOptions.durationUnitOptions.map(
                (option, index) => (
                  <option className="font-semibold" key={index} value={option}>
                    {option}
                  </option>
                ),
              )}
            </select>
            <FaChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-600"
              size={10}
            />
          </div>
        </div>
        {renderSelect(
          "Timing function",
          memoizedSelectOptions.timingOptions,
          animation.timingFunction ?? "",
          handleSelectChange("timingFunction"),
          "timing-function",
        )}
        {renderCheckbox(
          "Use steps",
          animation.isChecked ?? false,
          handleChange("isChecked"),
          "use-steps",
        )}
        <div
          className={`flex gap-2 ${!animation.isChecked ? "pointer-events-none opacity-50" : ""} relative`}
        >
          <input
            id="steps"
            type="text"
            className="h-[28px] w-full bg-bgcolor px-2 text-sm font-semibold text-navbar placeholder:font-semibold"
            placeholder="2"
            value={animation.steps || ""}
            disabled={!animation.isChecked}
            onChange={handleChange("steps")}
          />
          <select
            id="step-type"
            className="h-[28px] w-[40%] appearance-none bg-bgcolor px-2 text-sm font-semibold text-navbar focus:outline-none focus:ring-0"
            value={animation.stepType || ""}
            onChange={handleSelectChange("stepType")}
          >
            {memoizedSelectOptions.stepTypeOptions.map((option, index) => (
              <option className="font-semibold" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-600"
            size={10}
          />
        </div>

        <label htmlFor="delay" className="block text-xs text-gray-500">
          Delay
        </label>
        <div className="relative flex gap-x-2">
          <input
            id="delay"
            type="text"
            className={`h-[28px] w-full bg-bgcolor px-2 text-sm font-semibold text-navbar placeholder:font-semibold xs:w-full`}
            placeholder="Delay in sec"
            value={animation.delay || ""}
            onChange={handleChange("delay")}
          />
          <select
            id="delay-unit"
            className="h-[28px] w-[40%] appearance-none self-end bg-bgcolor px-2 text-sm font-semibold text-navbar focus:outline-none focus:ring-0"
            value={animation.delayUnit || ""}
            onChange={handleSelectChange("delayUnit")}
          >
            {memoizedSelectOptions.delayUnitOptions.map((option, index) => (
              <option className="font-semibold" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="pointer-events-none absolute right-3 top-1/3 transform text-gray-600"
            size={10}
          />
        </div>
        <div>
          <label
            htmlFor="iteration-count"
            className="block text-xs text-gray-500"
          >
            Iteration-count
          </label>
          <div className="flex items-center justify-center gap-x-2">
            <input
              id="iteration-count"
              type="text"
              className={`h-[28px] w-full bg-bgcolor px-2 text-sm font-semibold text-navbar placeholder:font-semibold ${animation.isInfinite ? "pointer-events-none opacity-50" : ""}`}
              placeholder="Iteration-count"
              value={animation.iterationCount || ""}
              onChange={handleChange("iterationCount")}
              disabled={animation.isInfinite ?? false}
            />
            {renderCheckbox(
              "Infinite",
              animation.isInfinite ?? false,
              handleChange("isInfinite"),
              "infinite",
            )}
          </div>
        </div>
        <div className="relative">
          <label htmlFor="direction" className="block text-xs text-gray-500">
            Direction
          </label>
          <select
            id="direction"
            className="h-[28px] w-full appearance-none bg-bgcolor px-2 text-sm font-semibold text-navbar focus:outline-none focus:ring-0"
            value={animation.direction || ""}
            onChange={handleSelectChange("direction")}
          >
            {memoizedSelectOptions.directionOptions.map((option, index) => (
              <option className="font-semibold" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="pointer-events-none absolute right-3 top-[70%] -translate-y-1/2 transform text-gray-600"
            size={10}
          />
        </div>
        <div className="relative">
          <label htmlFor="fill-mode" className="block text-xs text-gray-500">
            Fill mode
          </label>
          <select
            id="fill-mode"
            className="h-[28px] w-full appearance-none bg-bgcolor px-2 text-sm font-semibold text-navbar focus:outline-none focus:ring-0"
            value={animation.fillMode || ""}
            onChange={handleSelectChange("fillMode")}
          >
            {memoizedSelectOptions.fillModeOptions.map((option, index) => (
              <option className="font-semibold" key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FaChevronDown
            className="pointer-events-none absolute right-3 top-[70%] -translate-y-1/2 transform text-gray-600"
            size={10}
          />
        </div>
      </fieldset>
    </form>
  );
}
