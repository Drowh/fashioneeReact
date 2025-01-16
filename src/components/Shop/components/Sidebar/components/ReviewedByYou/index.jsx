import { useState, useEffect } from "react";
import './reviewed.css'
const ReviewedByYou = ({ data }) => {
  const [reviewedProducts, setReviewedProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = () => {
      const shuffledProducts = [...data.products].sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, 3);
    };
    setReviewedProducts(getRandomProducts());
  }, [data]);

  
  return (
    <div className="sidebar-item">
      <div className="sidebar-title">Reviewed by you</div>
      <div className="sidebar-content">
        <div className="reviewed-products">
          {reviewedProducts.map((product) => (
            <div className="product" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.name}
              />
              <div className="info">
                <div className="name">{product.name}</div>
                <div className="price">
                  <div className="current-price">{product.price}</div>
                  <div className="old-price">{product.oldPrice}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewedByYou;
