import React from "react";

import '../Header/header.css'
const Header = ({ onTabChange, activeTab }) => {


  const handleClick = (tab) => { 
    onTabChange(tab);   
  }

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
              className={`menu-item ${activeTab === "card" ? "active" : ""}`}
              onClick={() => handleClick("card")}
            >
              <span>Card</span>
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
            <div className="counter js-favorites-counter">0</div>
          </div>
          <div className="header-icon">
            <img src="./icons/cart.svg" alt="cart icon" />
            <div className="counter js-basket-counter">0</div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
