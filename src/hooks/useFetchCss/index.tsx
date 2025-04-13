export const fetchAnimationStyles = (className: string) => {
  for (const sheet of document.styleSheets) {
    try {
      for (let i = 0; i < sheet.cssRules.length; i++) {
        const rule = sheet.cssRules[i] as CSSStyleRule;

        if (rule.selectorText && rule.selectorText.includes(className)) {
          const styles = rule.style;

          const getValueAndUnit = (value: string) => {
            const match = value.match(/^([\d.]+)(\D+)$/);
            return match
              ? { value: match[1], unit: match[2] }
              : { value: "", unit: "" };
          };

          return {
            duration: getValueAndUnit(styles.animationDuration).value,
            durationUnit: getValueAndUnit(styles.animationDuration).unit,
            timingFunction: styles.animationTimingFunction || "",
            delay: getValueAndUnit(styles.animationDelay).value,
            delayUnit: getValueAndUnit(styles.animationDelay).unit,
            iterationCount: styles.animationIterationCount || "",
            direction: styles.animationDirection || "",
            fillMode: styles.animationFillMode || "",
          };
        }
      }
    } catch (e) {
      console.warn("Error accessing CSS rules for style sheet:", e);
    }
  }

  console.warn(`No CSS rule found for element with class "${className}"`);
  return null;
};
