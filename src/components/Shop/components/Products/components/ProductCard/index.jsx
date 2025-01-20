import '../ProductCard/style.css'

const ProductCard = ({ product, isFavorite, toggleFavorite, handleAddToBasket }) => (
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
            onClick={toggleFavorite}
          />
        </div>
      </div>
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
      />
    </div>
    <div className="info">
      <div className="name">{product.name}</div>
      <div className="price">
        <div className="current-price">${product.price}</div>
        {product.oldPrice && <div className="old-price">${product.oldPrice}</div>}
      </div>
      <button
        className="buy-btn"
        onClick={() => handleAddToBasket(product)}
      >
        Buy Now
      </button>
    </div>
  </div>
);

export default ProductCard;

