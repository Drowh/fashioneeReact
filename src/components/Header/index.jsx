import { useContext, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { CartContext } from "../../contexts/CartContext";

import "../Header/style.css";

const Header = ({ onTabChange }) => {
  const { favorites = [] } = useContext(FavoritesContext);
  const { cart = [] } = useContext(CartContext);

  // Memoize calculation of total cart items
  const cartItemsCount = useMemo(() => {
    return Array.isArray(cart)
      ? cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
      : 0;
  }, [cart]);

  // Safe handling of favorites count
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;

  return (
    <div className="header-container">
      <header className="header">
        <div className="left-side">
          <div className="logo-container">
            <div className="burger-menu">
              <input
                type="checkbox"
                id="burger-checkbox"
                className="burger-checkbox"
              />
              <label className="burger" htmlFor="burger-checkbox"></label>
            </div>
            <div className="logo">
              <img src="icons/logo.svg" alt="logo" />
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="header-icon">
            <img src="./icons/search.svg" alt="search icon" />
          </div>
          <div className="header-icon">
            <img src="./icons/profile.svg" alt="profile icon" />
          </div>
          <div
            className="header-icon"
            onClick={() => onTabChange("shop")}
            role="button"
            aria-label="Перейти в магазин"
          >
            <img src="./icons/heart.svg" alt="favorites icon" />
            <div className="counter">{favoritesCount}</div>
          </div>
          <div
            className="header-icon"
            onClick={() => onTabChange("cart")}
            role="button"
            aria-label="Перейти в корзину"
          >
            <img src="./icons/cart.svg" alt="cart icon" />
            <div className="counter">{cartItemsCount}</div>
          </div>
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  onTabChange: PropTypes.func.isRequired,
};

export default memo(Header);
