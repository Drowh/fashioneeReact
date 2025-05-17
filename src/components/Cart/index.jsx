import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import "../Cart/style.css";

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeProductCompletely,
    clearCart,
  } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "ilovereact") {
      setDiscount(0.1);
      setNotification({
        message: "Промокод применен! Скидка 10%",
        type: "success",
      });
    } else {
      setDiscount(0);
      setNotification({ message: "Некорректный промокод", type: "error" });
    }

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // Безопасное получение цены и преобразование в число
  const safePrice = (price) => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? 0 : numPrice;
  };

  // Безопасный расчет общей цены
  const getItemTotal = (product) => {
    const price = safePrice(product.price);
    const quantity = product.quantity || 0;
    return price * quantity;
  };

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((total, product) => total + getItemTotal(product), 0)
    : 0;

  const discountAmount = totalPrice * discount;
  const deliveryCost = totalPrice > 0 ? 15.0 : 0;
  const finalTotal = totalPrice - discountAmount + deliveryCost;

  const handleCheckout = () => {
    if (!Array.isArray(cart) || cart.length === 0) {
      setNotification({ message: "Корзина пуста", type: "error" });
      return;
    }

    // Здесь должен быть API-запрос для оформления заказа
    setNotification({ message: "Заказ успешно оформлен!", type: "success" });
    clearCart();

    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // Безопасная проверка, что корзина - это массив и он не пустой
  const isCartEmpty = !Array.isArray(cart) || cart.length === 0;

  return (
    <div className="container">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="cart">
        {isCartEmpty ? (
          <div className="empty-cart-message">
            <h2>
              <u>Your cart is empty. Start adding products!</u>
            </h2>
          </div>
        ) : (
          <div className="order-wrapper">
            <div className="products-list">
              {cart.map((product) => (
                <div className="product" key={product.id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <div className="product-info">
                    <div className="name">{product.name}</div>
                    <div className="price-wrapper">
                      <div className="price-and-quantity">
                        <div className="price">
                          {product.oldPrice && (
                            <div className="old-price">
                              ${safePrice(product.oldPrice).toFixed(2)}
                            </div>
                          )}
                          <div className="current-price">
                            ${safePrice(product.price).toFixed(2)}
                          </div>
                        </div>
                        <div className="quantity">
                          <div
                            className="count-button"
                            onClick={() => removeFromCart(product.id)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </div>
                          <div className="count">{product.quantity || 0}</div>
                          <div
                            className="count-button"
                            onClick={() => addToCart(product)}
                            aria-label="Increase quantity"
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="total-price">
                        ${getItemTotal(product).toFixed(2)}
                      </div>
                    </div>
                    <div
                      className="close"
                      onClick={() => removeProductCompletely(product.id)}
                      aria-label="Remove from cart"
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
                  <div className="price">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="price-row">
                  <div className="name">Discount for promo code</div>
                  <div>${discountAmount.toFixed(2)}</div>
                </div>
                <div className="price-row delimiter">
                  <div className="name">
                    Delivery{" "}
                    <span className="additional">(Aug 02 at 16:00)</span>
                  </div>
                  <div className="price">${deliveryCost.toFixed(2)}</div>
                </div>
                <div className="price-row total">
                  <div className="name">Total</div>
                  <div className="price">${finalTotal.toFixed(2)}</div>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {!isCartEmpty && (
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
                type="text"
                className="input"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={handlePromoCodeChange}
              />
              <div className="button-wrapper">
                <button
                  className="button"
                  onClick={applyPromoCode}
                  aria-label="Apply promo code"
                >
                  <img src="./icons/button-arrow.svg" alt="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
