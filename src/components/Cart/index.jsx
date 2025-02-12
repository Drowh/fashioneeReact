import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import "../Cart/style.css";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "ilovereact") {
      setDiscount(0.1);
      alert("Промокод применен! Скидка 10%");
    } else {
      setDiscount(0);
      alert("Некорректный промокод");
    }
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const discountAmount = totalPrice * discount;
  const deliveryCost = 15.0;
  const finalTotal = totalPrice - discountAmount + deliveryCost;

  const handleCheckout = () => {
    console.log("Order Details:", {
      Products: cart,
      DiscountApplied: discountAmount.toFixed(2),
      DeliveryCost: deliveryCost.toFixed(2),
      TotalAmount: finalTotal.toFixed(2),
    });
    alert("Заказ успешно оформлен!");
  };

  return (
    <div className="container">
      <div className="cart">
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <h2><u>Your cart is empty. Start adding products!</u></h2>
          </div>
        ) : (
          <div className="order-wrapper">
            <div className="products-list">
              {cart.map((product) => (
                <div className="product" key={product.id}>
                  <img className="product-image" src={product.image} alt={product.name} />
                  <div className="product-info">
                    <div className="name">{product.name}</div>
                    <div className="price-wrapper">
                      <div className="price-and-quantity">
                        <div className="price">
                          {product.oldPrice && (
                            <div className="old-price">${product.oldPrice}</div>
                          )}
                          <div className="current-price">${product.price}</div>
                        </div>
                        <div className="quantity">
                          <div className="count-button" onClick={() => removeFromCart(product.id)}>-</div>
                          <div className="count">{product.quantity}</div>
                          <div className="count-button" onClick={() => addToCart(product)}>+</div>
                        </div>
                      </div>
                      <div className="total-price">${(product.price * product.quantity).toFixed(2)}</div>
                    </div>
                    <div className="close" onClick={() => removeFromCart(product.id)}>X</div>
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
                  <div className="name">Delivery <span className="additional">(Aug 02 at 16:00)</span></div>
                  <div className="price">${deliveryCost.toFixed(2)}</div>
                </div>
                <div className="price-row total">
                  <div className="name">Total</div>
                  <div className="price">${finalTotal.toFixed(2)}</div>
                </div>
              </div>
              <div className="button-wrapper">
                <button className="button" onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="promo-code-wrapper">
            <div className="info">
              <div className="title">You Have A Promo Code?</div>
              <div className="description">
                To receive up-to-date promotional codes, subscribe to us on social networks.
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
                <button className="button" onClick={applyPromoCode}>
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
