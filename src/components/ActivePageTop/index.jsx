import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";

const ActivePageTop = ({ activePage, onTabChange }) => {
  const handleClick = useCallback(
    (tab) => {
      onTabChange(tab);
    },
    [onTabChange]
  );

  return (
    <div className="container-active-page">
      <div className="active-page-top">
        <div className="block-left">
          <div className="text-inside-blockleft">
            <h1 className="title">{activePage}</h1>
            <nav className="about-page" aria-label="Навигация по страницам">
              <div className="vertical-line"></div>
              <div>Home</div>
              <button
                className={
                  activePage === "Shop" ? "active-page nav-link" : "nav-link"
                }
                onClick={() => handleClick("shop")}
                aria-current={activePage === "Shop" ? "page" : undefined}
              >
                Shop
              </button>
              <button
                className={
                  activePage === "Cart" ? "active-page nav-link" : "nav-link"
                }
                onClick={() => handleClick("cart")}
                aria-current={activePage === "Cart" ? "page" : undefined}
              >
                Cart
              </button>
            </nav>
          </div>
          <img
            src="./icons/hr-line.svg"
            alt=""
            className="hr-line"
            aria-hidden="true"
          />
        </div>
        <div className="img-top-right"></div>
        <img
          src="./images/points-top.svg"
          alt=""
          className="points-top"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

ActivePageTop.propTypes = {
  activePage: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default memo(ActivePageTop);
