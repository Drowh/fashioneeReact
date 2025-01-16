import React from "react";

import "../Card/cart.css";

const Card = () => {
  return (
    <>
    <div className="container-active-page">
      
      <div className="container">
        <div className="cart">
          <div className="order-wrapper js-order-wrapper">
            <div className="products-list js-products-list">
              {/** Здесь можно позже динамически выводить продукты */}
              <div className="product">
                <div className="photo"></div>
                <div className="product-info">
                  <div className="title">Fashionee - cotton shirt (S)</div>
                  <div className="price-wrapper">
                    <div className="price-and-quantity">
                      <div className="price">
                        <div className="old-price">$52.99</div>
                        <div className="current-price">$35.99</div>
                      </div>
                      <div className="quantity">
                        <div className="count-button">-</div>
                        <div className="count">1</div>
                        <div className="count-button">+</div>
                      </div>
                    </div>
                    <div className="total-price">$35.99</div>
                  </div>
                  <div className="close">X</div>
                </div>
              </div>
            </div>
            <div className="order">
              <div className="title">Your Order</div>
              <div className="order-price-wrapper">
                <div className="price-row">
                  <div className="name">Order price</div>
                  <div className="price" id="order-price">
                    $146.98
                  </div>
                </div>
                <div className="price-row">
                  <div className="name">Discount for promo code</div>
                  <div id="promo-discount">No</div>
                </div>
                <div className="price-row delimiter">
                  <div className="name">
                    Delivery{" "}
                    <span className="additional">(Aug 02 at 16:00)</span>
                  </div>
                  <div className="price" id="delivery-price">
                    $16
                  </div>
                </div>
                <div className="price-row total">
                  <div className="name">Total</div>
                  <div className="price" id="total-price">
                    $162.98
                  </div>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button">Checkout</button>
                <div className="vertical-line"></div>
              </div>
            </div>
          </div>
          <div className="promo-code-wrapper">
            <div className="info">
              <div className="title">You Have A Promo Code?</div>
              <div className="description">
                To receive up-to-date promotional codes, subscribe to us on
                social networks.
              </div>
            </div>
            <div className="promo-code">
              <input
                id="promo-code-input"
                type="text"
                name="promo-code"
                className="input"
                placeholder="Enter promo code"
              />
              <div className="button-wrapper">
                <button className="button" id="apply-promo-button">
                  <img src="./icons/button-arrow.svg" alt="arrow-icon" />
                </button>
                <div className="vertical-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Card;
