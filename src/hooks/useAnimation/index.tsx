import { useContext, useEffect, useCallback, useRef } from "react";
import { AnimationContext } from "../../context";
import { fetchAnimationStyles } from "../useFetchCss";

export const useAnimation = () => {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }

  const { animation, dispatch, setAnimation, resetAnimation } = context;

  const lastVariationRef = useRef<string | undefined>(
    animation.selectedVariation,
  );

  const updateAnimation = useCallback(() => {
    if (!animation.selectedVariation || !animation.selectedAnimation) return;

    if (animation.selectedVariation === lastVariationRef.current) {
      return;
    }

    lastVariationRef.current = animation.selectedVariation;

    const newValues = fetchAnimationStyles(animation.selectedVariation);

    if (newValues) {
      setAnimation({
        ...newValues,
      });
    }
  }, [animation.selectedVariation, animation.selectedAnimation, setAnimation]);

  useEffect(() => {
    updateAnimation();
  }, [updateAnimation]);

  return { animation, dispatch, setAnimation, resetAnimation };
};
