import { createContext, useState, useCallback } from "react";

export const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = "favorites";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error parsing favorites data from localStorage:", error);
      return [];
    }
  });

  // Вспомогательная функция для сохранения в localStorage
  const saveFavoritesToStorage = useCallback((updatedFavorites) => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, []);

  const toggleFavorite = useCallback(
    (productId) => {
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.includes(productId)
          ? prevFavorites.filter((id) => id !== productId)
          : [...prevFavorites, productId];

        saveFavoritesToStorage(updatedFavorites);
        return updatedFavorites;
      });
    },
    [saveFavoritesToStorage]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    saveFavoritesToStorage([]);
  }, [saveFavoritesToStorage]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
