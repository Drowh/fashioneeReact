import { useContext } from "react";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import { CartContext } from "../../contexts/CartContext";

import "../Header/style.css";

const Header = ({ onTabChange, activeTab }) => {
  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const handleClick = (tab) => {
    onTabChange(tab);
  };

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
          <div className="menu">
            <div
              className={`menu-item ${activeTab === "shop" ? "active" : ""}`}
              onClick={() => handleClick("shop")}
            >
              <span>Shop</span>
            </div>
            <div
              className={`menu-item ${activeTab === "cart" ? "active" : ""}`}
              onClick={() => handleClick("cart")}
            >
              <span>Cart</span>
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
          <div className="header-icon">
            <img src="./icons/heart.svg" alt="favorites icon" />
            <div className="counter">{favorites.length}</div>
          </div>
          <div className="header-icon">
            <img src="./icons/cart.svg" alt="cart icon" />
            <div className="counter">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
