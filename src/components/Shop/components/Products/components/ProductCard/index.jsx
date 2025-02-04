import { useContext } from "react";
import { FavoritesContext } from "../../../../../../contexts/FavoritesContext";
import { CartContext } from "../../../../../../contexts/CartContext";

import "../ProductCard/style.css";

const ProductCard = ({ product, isFavorite, isInCart }) => {
  const { toggleFavorite } = useContext(FavoritesContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const currentQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="product">
      <div className="photo">
        <div className="top-bar">
          <div className="labels">
            {product.isSale && <div className="label sale">Sale</div>}
            {product.isNew && <div className="label new">New</div>}
          </div>
          <div className="favorites">
            <img
              src={isFavorite ? "./icons/heart-red.svg" : "./icons/heart.svg"}
              alt="Favorite Icon"
              className={`favorite-icon ${isFavorite ? "filled" : ""}`}
              onClick={() => toggleFavorite(product.id)}
            />
          </div>
        </div>
        <img className="product-image" src={product.image} alt={product.name} />
      </div>
      <div className="info">
        <div className="name">{product.name}</div>
        <div className="price">
          <div className="current-price">${product.price}</div>
          {product.oldPrice && (
            <div className="old-price">${product.oldPrice}</div>
          )}
        </div>
        {isInCart && currentQuantity > 0 ? (
          <div className="cart-controls">
            <button
              className="cart-btn"
              onClick={() => removeFromCart(product.id)}
            >
              -
            </button>
            <span className="quantity">{currentQuantity}</span>
            <button className="cart-btn" onClick={() => addToCart(product)}>
              +
            </button>
          </div>
        ) : (
          <button className="buy-btn" onClick={() => addToCart(product)}>
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
