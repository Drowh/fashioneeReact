import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import "../Cart/style.css";

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useContext(ShopContext);

  return (
    <div className="container">
      <div className="cart">
        <div className="order-wrapper">
          <div className="products-list">
            {cart.map((product) => (
              <div className="product" key={product.id}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-info">
                  <div className="title">{product.title}</div>
                  <div className="price-wrapper">
                    <div className="price-and-quantity">
                      <div className="price">
                      {product.oldPrice && <div className="old-price">${product.oldPrice}</div>}
                        <div className="current-price">${product.price}</div>
                      </div>
                      <div className="quantity">
                        <div
                          className="count-button"
                          onClick={() => removeFromCart(product.id)}
                        >
                          -
                        </div>
                        <div className="count">{product.quantity}</div>
                        <div
                          className="count-button"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="total-price">
                      ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div
                    className="close"
                    onClick={() => removeFromCart(product.id)}
                  >
                    X
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="order">
            <div className="title">Your Order</div>
            <div className="order-price-wrapper">
              <div className="price-row">
                <div className="name">Order price</div>
                <div className="price">
                  $
                  {cart
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
              <div className="price-row">
                <div className="name">Discount for promo code</div>
                <div>No</div>
              </div>
              <div className="price-row delimiter">
                <div className="name">
                  Delivery <span className="additional">(Aug 02 at 16:00)</span>
                </div>
                <div className="price">$16.00</div>
              </div>
              <div className="price-row total">
                <div className="name">Total</div>
                <div className="price">
                  $
                  {(
                    cart.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    ) + 16
                  ).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <button className="button">Checkout</button>
            </div>
          </div>
        </div>

        <div className="promo-code-wrapper">
          <div className="info">
            <div className="title">You Have A Promo Code?</div>
            <div className="description">
              To receive up-to-date promotional codes, subscribe to us on social
              networks.
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
