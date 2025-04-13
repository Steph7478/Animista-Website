import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useCallback,
} from "react";
import { selectOptions } from "../data/Options";

interface AnimationOptions {
  selectedAnimation: string | undefined;
  selectedVariation: string | undefined;
  selectedObjectName: string | undefined;
  selectedObjectClass: string | undefined;
  duration: string | undefined;
  durationUnit: string | undefined;
  timingFunction: string | undefined;
  steps: string | undefined;
  stepType: string | undefined;
  delay: string | undefined;
  delayUnit: string | undefined;
  iterationCount: string | undefined;
  isInfinite: boolean | undefined;
  isChecked: boolean | undefined;
  direction: string | undefined;
  fillMode: string | undefined;
  favorites: Record<string, string[]>;
  isFiltered: boolean | undefined;
  selectOptions: typeof selectOptions;
}

const defaultState: AnimationOptions = {
  selectedAnimation: "",
  selectedVariation: undefined,
  selectedObjectName: "",
  selectedObjectClass: "",
  duration: "",
  durationUnit: "",
  timingFunction: "",
  steps: "",
  delay: "",
  delayUnit: "",
  iterationCount: "",
  isInfinite: false,
  isChecked: false,
  direction: "",
  fillMode: "",
  favorites: {},
  isFiltered: false,
  stepType: "",
  selectOptions,
};

type Action =
  | { type: "SET"; payload: Partial<AnimationOptions> }
  | { type: "RESET" };

const reducer = (state: AnimationOptions, action: Action): AnimationOptions => {
  switch (action.type) {
    case "SET": {
      const updatedState = { ...state, ...action.payload };

      if (action.payload.selectedVariation === state.selectedVariation) {
        return state;
      }

      if (
        action.payload.selectedAnimation &&
        action.payload.selectedAnimation !== state.selectedAnimation
      ) {
        const selectedObject = Object.values(state.selectOptions.object)
          .flat()
          .find((obj) => obj.name === action.payload.selectedObjectName);

        if (selectedObject) {
          updatedState.selectedObjectClass = selectedObject.className;
          updatedState.selectedObjectName =
            action.payload.selectedObjectName || "";
        }

        return {
          ...updatedState,
          favorites: updatedState.favorites,
          isFiltered: updatedState.isFiltered,
          isChecked: false,
          isInfinite: false,
        };
      }

      if (
        action.payload.selectedObjectName &&
        action.payload.selectedObjectName !== state.selectedObjectName
      ) {
        const selectedObject = Object.values(state.selectOptions.object)
          .flat()
          .find((obj) => obj.name === action.payload.selectedObjectName);

        if (selectedObject) {
          updatedState.selectedObjectClass = selectedObject.className;
          updatedState.selectedObjectName =
            action.payload.selectedObjectName || "";
        }
      }

      return updatedState;
    }

    case "RESET":
      return {
        ...state,
        favorites: defaultState.favorites,
      };

    default:
      return state;
  }
};

const AnimationContext = createContext<
  | {
      dispatch: Dispatch<Action>;
      animation: AnimationOptions;
      setAnimation: (payload: Partial<AnimationOptions>) => void;
      resetAnimation: () => void;
    }
  | undefined
>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [animation, dispatch] = useReducer(reducer, defaultState);

  const setAnimation = useCallback((payload: Partial<AnimationOptions>) => {
    dispatch({ type: "SET", payload });
  }, []);

  const resetAnimation = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return (
    <AnimationContext.Provider
      value={{ animation, dispatch, setAnimation, resetAnimation }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export { AnimationContext, type AnimationOptions };
