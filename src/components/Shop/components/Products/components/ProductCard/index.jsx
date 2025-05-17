import { useContext, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { FavoritesContext } from "../../../../../../contexts/FavoritesContext";
import { CartContext } from "../../../../../../contexts/CartContext";

import "../ProductCard/style.css";

// Вспомогательная функция для безопасного преобразования и форматирования цены
const formatPrice = (price) => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
};

const ProductCard = ({ product, isFavorite = false, isInCart = false }) => {
  const { toggleFavorite } = useContext(FavoritesContext);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const currentQuantity =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(product.id);
  }, [toggleFavorite, product.id]);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(product.id);
  }, [removeFromCart, product.id]);

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
              onClick={handleToggleFavorite}
            />
          </div>
        </div>
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>
      <div className="info">
        <div className="name">{product.name}</div>
        <div className="price">
          <div className="current-price">${formatPrice(product.price)}</div>
          {product.oldPrice && (
            <div className="old-price">${formatPrice(product.oldPrice)}</div>
          )}
        </div>
        {isInCart && currentQuantity > 0 ? (
          <div className="cart-controls">
            <button
              className="cart-btn"
              onClick={handleRemoveFromCart}
              aria-label="Remove one from cart"
            >
              -
            </button>
            <span className="quantity">{currentQuantity}</span>
            <button
              className="cart-btn"
              onClick={handleAddToCart}
              aria-label="Add one to cart"
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="buy-btn"
            onClick={handleAddToCart}
            aria-label="Buy now"
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    oldPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string.isRequired,
    isSale: PropTypes.bool,
    isNew: PropTypes.bool,
  }).isRequired,
  isFavorite: PropTypes.bool,
  isInCart: PropTypes.bool,
};

export default memo(ProductCard);
