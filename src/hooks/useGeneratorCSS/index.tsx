import {
  Dispatch,
  JSX,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAnimation } from "../useAnimation";

interface UpdateCSSProps {
  navigationComplete?: boolean;
  setNavigationComplete?: Dispatch<SetStateAction<boolean>>;
}

export function UpdateCSS({
  navigationComplete,
  setNavigationComplete,
}: UpdateCSSProps = {}) {
  const getAnimationDetails = (element: HTMLElement) => {
    const computedStyle = getComputedStyle(element);

    return {
      name: computedStyle.animationName,
      webkitAnimation: computedStyle.webkitAnimation,
      transform: computedStyle.transform,
    };
  };

  const propertiesGenerator = (cssContent: string): string | null => {
    const keyframesName = cssContent;
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSKeyframesRule && rule.name === keyframesName) {
            return rule.cssText;
          }
        }
      } catch (err) {
        console.warn("Error", err);
      }
    }
    return null;
  };

  const webkitGenerator = (cssContent: string): string | null => {
    const keyframesName = cssContent;
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSKeyframesRule && rule.name === keyframesName) {
            const prefix = rule.name.startsWith("-webkit-") ? "" : "-webkit-";
            const keyframesContent = Array.from(rule.cssRules)
              .map((keyframe) => {
                if (keyframe instanceof CSSKeyframeRule) {
                  const key = keyframe.keyText;
                  const declarations = Array.from(keyframe.style)
                    .map((prop: string) => {
                      const webkitProp = `-${prefix}${prop}`;
                      const declaration = `${webkitProp}: ${keyframe.style.getPropertyValue(prop)};\n`;
                      const normalDeclaration = `${prop}: ${keyframe.style.getPropertyValue(prop)};`;
                      return `${declaration}  ${normalDeclaration}`;
                    })
                    .join(" ");
                  return `  ${key} { ${declarations} }`;
                }
                return "";
              })
              .join("\n");

            return `@${prefix}keyframes ${rule.name} {\n${keyframesContent}\n}`;
          }
        }
      } catch (err) {
        console.warn("Error", err);
      }
    }
    return null;
  };

  const generateCodeBlock = (
    cssContent: string | null,
    minify: boolean,
  ): JSX.Element => {
    return (
      <code className="whitespace-pre-line text-sm font-normal">
        {minify ? cssContent?.replace(/\s+/g, " ") : cssContent}
      </code>
    );
  };

  const generateProperties = useCallback(
    (element: HTMLElement, minify: boolean, autoprefixer: boolean): unknown => {
      const { webkitAnimation, name, transform } = getAnimationDetails(element);

      if (autoprefixer) {
        return minify
          ? generateCodeBlock(
              `.${name}{-webkit-animation: ${webkitAnimation}; -animation: ${transform};}`,
              minify,
            )
          : generateCodeBlock(
              `.${name} {\n  -webkit-animation: ${webkitAnimation};\n  -animation: ${webkitAnimation};\n}`,
              minify,
            );
      } else {
        return minify
          ? generateCodeBlock(
              `.${name} {-animation: ${webkitAnimation};}`,
              minify,
            )
          : generateCodeBlock(
              `.${name} {\n  -animation: ${webkitAnimation};\n}`,
              minify,
            );
      }
    },
    [],
  );

  const generateKeyframes = useCallback(
    (
      animationName: string,
      minify: boolean,
      autoprefixer: boolean,
    ): JSX.Element => {
      const cssContent = autoprefixer
        ? webkitGenerator(animationName)
        : propertiesGenerator(animationName);

      return generateCodeBlock(cssContent || ``, minify);
    },
    [],
  );

  const { animation } = useAnimation();

  const [generateCss, setGenerateCss] = useState({
    keyframes: "",
    animationName: "",
    properties: "",
    autoprefixer: true,
    minify: false,
  });

  const updatekey = useCallback(() => {
    const element = document.querySelector(
      `.${animation.selectedVariation}`,
    ) as HTMLElement;

    if (element) {
      const animationDetails = getAnimationDetails(element);

      const keyframes = generateKeyframes(
        animationDetails.name,
        generateCss.minify,
        generateCss.autoprefixer,
      ) as unknown as string;

      const properties = generateProperties(
        element,
        generateCss.minify,
        generateCss.autoprefixer,
      ) as string;

      setGenerateCss((prevState) => ({
        ...prevState,
        animationName: animationDetails.name,
        keyframes: keyframes,
        properties: properties,
      }));
    }
    if (setNavigationComplete) {
      setNavigationComplete(false);
    }
  }, [
    animation.selectedVariation,
    setNavigationComplete,
    generateKeyframes,
    generateCss.minify,
    generateCss.autoprefixer,
    generateProperties,
  ]);

  useEffect(() => {
    if (navigationComplete) {
      updatekey();
    }
  }, [navigationComplete, updatekey]);

  useEffect(() => {
    updatekey();
  }, [generateCss.minify, generateCss.autoprefixer, updatekey]);

  const cssMemo = useMemo(
    () => generateCss.properties,
    [generateCss.properties],
  );
  const keyframesMemo = useMemo(
    () => generateCss.keyframes,
    [generateCss.keyframes],
  );

  return {
    updatekey,
    generateCss,
    setGenerateCss,
    cssMemo,
    keyframesMemo,
    generateKeyframes,
  };
}
