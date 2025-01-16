import { useState, useEffect } from 'react';

const useFavoriteProduct = (productId) => {
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(productId);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsFavoriteProduct(isFavorite(productId));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [productId]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(productId);
    if (index === -1) {
      favorites.push(productId);
    } else {
      favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavoriteProduct(!isFavoriteProduct);
    updateHeaderCounts();
  };

  const isFavorite = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(productId);
  };

  const updateHeaderCounts = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    let countInBasket = basket.reduce((acc, product) => acc + product.quantity, 0);
    let countInFavorites = favorites.length;
    document.querySelector('.js-favorites-counter').textContent = countInFavorites;
    document.querySelector('.js-basket-counter').textContent = countInBasket;
  };

  return [isFavoriteProduct, toggleFavorite];
};

export default useFavoriteProduct;