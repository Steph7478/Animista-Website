import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { animationDetail } from "../../data/Animations";
import { useAnimation } from "../useAnimation";

export function useNavigation(
  setAnimationStyle: Dispatch<SetStateAction<Record<string, string>>>,
) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = useMemo(
    () => location.pathname.split("/").filter(Boolean),
    [location.pathname],
  );

  const { animation, dispatch } = useAnimation();

  const menu = pathSegments[1] || "";
  const categories = pathSegments[2] || "";
  const options = pathSegments[3] || "";
  const [navigationComplete, setNavigationComplete] = useState(false);

  const detail = useMemo(() => {
    if (menu && categories) {
      return animationDetail[menu]?.find((item) => item.name === categories)
        ?.options;
    }
    return [];
  }, [menu, categories]);

  const firstCategory = useMemo(() => {
    return animationDetail[menu]?.[0].name || "";
  }, [menu]);

  const firstOption = useMemo(() => {
    return animationDetail[menu]?.[0].options[0] || "";
  }, [menu]);

  const navigateAndUpdateState = useCallback(
    (menu: string, category: string, option: string | undefined) => {
      const selectedAnimation = animationDetail[menu]?.find(
        (item) => item.name === category,
      );

      const newSelectedObjectName =
        category !== animation.selectedAnimation
          ? selectedAnimation?.objectType
          : animation.selectedObjectName;

      if (menu && category && option) {
        dispatch({
          type: "SET",
          payload: {
            selectedAnimation: category,
            selectedVariation: option || undefined,
            selectedObjectName: newSelectedObjectName,
          },
        });

        navigate(`/play/${menu}/${category}/${option}`);
        setNavigationComplete(true);
      }
    },
    [
      animation.selectedAnimation,
      animation.selectedObjectName,
      dispatch,
      navigate,
    ],
  );
  useEffect(() => {
    if (!menu) {
      const firstMenu = Object.keys(animationDetail)[0];
      const firstCategory = animationDetail[firstMenu]?.[0].name;

      navigateAndUpdateState(
        firstMenu,
        firstCategory,
        animationDetail[firstMenu]?.[0].options[0],
      );
    } else if (menu && !categories && !options) {
      navigateAndUpdateState(menu, firstCategory, firstOption);
    }
  }, [
    categories,
    firstCategory,
    firstOption,
    menu,
    navigateAndUpdateState,
    options,
    setAnimationStyle,
  ]);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const isReload = sessionStorage.getItem("reload");

    if (isReload) {
      dispatch({ type: "RESET" });
      sessionStorage.removeItem("reload");
    } else {
      sessionStorage.setItem("reload", "true");
    }
    navigateAndUpdateState(menu, categories, options);
  }, [categories, dispatch, menu, navigateAndUpdateState, options]);

  const handleAnimationClick = (clickedAnimationName: string) => {
    if (clickedAnimationName === categories) return;
    const selectedAnimation = animationDetail[menu]?.find(
      (item) => item.name === clickedAnimationName,
    );
    if (!selectedAnimation) return;
    const firstOption = selectedAnimation?.options?.[0];
    if (clickedAnimationName !== categories || firstOption !== options) {
      navigateAndUpdateState(menu, clickedAnimationName, firstOption);
    }
  };

  const handleOptionsClick = (
    option: string,
    scrollRefSecondary: RefObject<HTMLDivElement | null>,
    index: number,
  ) => {
    if (menu && categories) {
      navigateAndUpdateState(menu, categories, option);

      if (!scrollRefSecondary?.current) return;

      const container = scrollRefSecondary.current;
      const clickedItem = container.children[index] as HTMLElement | undefined;

      if (!clickedItem) return;

      const newScrollX = Math.min(
        clickedItem.offsetLeft - 12,
        container.scrollWidth - container.clientWidth,
      );

      container.scrollTo({ left: Math.max(0, newScrollX), behavior: "smooth" });
    }
  };

  return {
    pathSegments,
    menu,
    detail,
    categories,
    options,
    navigateAndUpdateState,
    navigationComplete,
    setNavigationComplete,
    handleAnimationClick,
    handleOptionsClick,
  };
}
