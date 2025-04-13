import { useCallback, useEffect, useMemo } from "react";
import { useAnimation } from "../useAnimation";

export function useFavorites(categories: string = "defaultCategory") {
  const { animation, dispatch } = useAnimation();

  const addFavorite = useCallback(
    (category: string, item: string) => {
      if (category && item) {
        const updatedFavs = {
          ...animation.favorites,
          [category]: animation.favorites?.[category]
            ? [...new Set([...animation.favorites[category], item])]
            : [item],
        };

        dispatch({
          type: "SET",
          payload: { favorites: updatedFavs },
        });

        localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      }
    },
    [animation.favorites, dispatch],
  );

  const removeFavorite = useCallback(
    (category: string, item: string) => {
      if (category && item) {
        const updatedFavs = {
          ...animation.favorites,
          [category]:
            animation.favorites?.[category]?.filter((fav) => fav !== item) ||
            [],
        };

        if (updatedFavs[category]?.length === 0) {
          delete updatedFavs[category];
        }

        dispatch({
          type: "SET",
          payload: { favorites: updatedFavs },
        });

        localStorage.setItem("favorites", JSON.stringify(updatedFavs));
      }
    },
    [animation.favorites, dispatch],
  );

  const toggleFavorite = useCallback(
    (category: string, item: string) => {
      if (animation.favorites?.[category]?.includes(item)) {
        removeFavorite(category, item);
      } else {
        addFavorite(category, item);
      }
    },
    [animation.favorites, addFavorite, removeFavorite],
  );

  const favoriteCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const favorites = animation.favorites ?? {};

    Object.keys(favorites).forEach((category) => {
      counts[category] = favorites[category].length;
    });

    return { counts };
  }, [animation.favorites]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "{}",
    );
    dispatch({
      type: "SET",
      payload: { favorites: storedFavorites },
    });
  }, [dispatch]);

  const toggleHeart = useCallback(
    (options: string) => {
      return animation.favorites?.[categories]?.includes(options);
    },
    [animation.favorites, categories],
  );

  const favs = useMemo(
    () =>
      animation.favorites
        ? Object.values(animation.favorites)
            .flat()
            .concat(Object.keys(animation.favorites))
        : [],
    [animation.favorites],
  );

  const downloadFavs = useMemo(() => {
    if (animation.favorites) {
      return Object.values(animation.favorites).reduce((acc, item) => {
        if (Array.isArray(item)) {
          acc.push(...item);
        }
        return acc;
      }, []);
    }
    return [];
  }, [animation.favorites]);

  return {
    addFavorite,
    downloadFavs,
    removeFavorite,
    favoriteCounts,
    toggleHeart,
    favs,
    toggleFavorite,
  };
}
