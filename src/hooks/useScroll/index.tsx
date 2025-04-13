import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export function useScroll(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  filteredMenuItems: Partial<Array<{ name: string }>>,
  pathSegments: string[],
  setAnimationStyle: Dispatch<SetStateAction<Record<string, string>>>,
) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (scrollRef.current) {
      setScrollLeft(scrollRef.current.scrollLeft);
      scrollRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    const moveX = e.clientX - startX;
    scrollRef.current.scrollLeft = scrollLeft - moveX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "grab";
      }
    }
  };

  const scrollToFirstItem = useCallback(
    (ref: RefObject<HTMLDivElement | null>) => {
      if (!ref.current || !filteredMenuItems) return;

      const firstItem = ref.current.children[0] as HTMLElement | undefined;
      if (!firstItem) return;

      ref.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    },
    [filteredMenuItems],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (!filteredMenuItems || !scrollRef.current) return;

      const firstItem = scrollRef.current.children[0] as HTMLElement;
      const itemWidth = firstItem?.offsetWidth || 0;
      const currentScrollX = scrollRef.current.scrollLeft;

      const newScrollX =
        currentScrollX +
        (e.deltaY > 0
          ? itemWidth * filteredMenuItems.length
          : -itemWidth * filteredMenuItems.length);

      let animation = "";

      if (e.deltaY > 0) {
        animation = "bounceLeftNegative 0.6s ease-out forwards";
      } else if (e.deltaY < 0) {
        if (currentScrollX > 0) {
          animation = "bounceLeftPositive 0.6s ease-out forwards";
        } else {
          return;
        }
      }

      setAnimationStyle((prev) => ({
        ...prev,
        animation,
      }));

      scrollRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
    },
    [filteredMenuItems, scrollRef, setAnimationStyle],
  );

  useEffect(() => {
    if (!scrollRef.current || !filteredMenuItems) return;

    const minScroll = 0;
    const maxScroll =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    setAnimationStyle((prev) => ({
      ...prev,
      "--max-scroll-positive": `${minScroll}px`,
      "--max-scroll-negative": `${maxScroll}px`,
    }));
  }, [filteredMenuItems, scrollRef, setAnimationStyle]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel, scrollRef]);

  useEffect(() => {
    if (!scrollRef.current || !filteredMenuItems) return;

    const firstItem = scrollRef.current.children[0] as HTMLElement | undefined;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth || 0;
    const totalItemsWidth = itemWidth * filteredMenuItems.length;

    const activeItemIndex =
      filteredMenuItems.findIndex(
        (animation) => pathSegments[2] === animation?.name,
      ) || 0;

    if (activeItemIndex !== -1 && activeItemIndex !== 0) {
      const activeItem = scrollRef.current.children[
        activeItemIndex
      ] as HTMLElement;
      if (activeItem) {
        setAnimationStyle((prev) => ({
          ...prev,
          animation: "0.6s ease-out forwards",
        }));

        let newScrollX = activeItem.offsetLeft - 12;

        if (newScrollX < scrollRef.current.scrollLeft) {
          newScrollX = 0;
        } else if (
          newScrollX + itemWidth >
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth
        ) {
          newScrollX = totalItemsWidth - scrollRef.current.clientWidth;
        }

        newScrollX = Math.max(
          0,
          Math.min(
            newScrollX,
            scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
          ),
        );

        let currentX = scrollRef.current.scrollLeft;
        const direction = newScrollX > currentX ? 1 : -1;

        const stepScroll = () => {
          if (!scrollRef.current) return;

          currentX += itemWidth * direction;
          if (
            (direction === 1 && currentX >= newScrollX) ||
            (direction === -1 && currentX <= newScrollX)
          ) {
            scrollRef.current.scrollLeft = newScrollX;
          } else {
            scrollRef.current.scrollLeft = currentX;
            requestAnimationFrame(stepScroll);
          }
        };
        stepScroll();
      }
    } else {
      scrollToFirstItem(scrollRef);
    }
    setAnimationStyle((prev) => ({
      ...prev,
      animation: "",
    }));
  }, [
    filteredMenuItems,
    pathSegments,
    scrollRef,
    scrollToFirstItem,
    setAnimationStyle,
  ]);

  return {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging,
    scrollToFirstItem,
  };
}
