import React, { useEffect, useState } from "react";
import data from "../../../../products.json";

function Sidebar({ setSearchQuery, setSelectedCategory }) {

  const [reviewedProducts, setReviewedProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = () => {
      const products = data.products;
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, 3);
    };

    setReviewedProducts(getRandomProducts());
  }, []);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <aside className="sidebar">
      {/* Search */}
      <div className="search">
        <label>
          <input
            type="text"
            placeholder="Search"
            className="input search-row"
            id="search-row"
            onChange={handleSearchChange}
          />
          <img
            src="./icons/search.svg"
            alt="Search Icon"
            className="search-icon"
          />
        </label>
      </div>
      {/* Categories */}
      <div className="sidebar-item">
        <div className="sidebar-title">Categories</div>
        <div className="sidebar-content">
          <ul className="custom-list">
            {["ALL", "Men", "Women", "Accessories", "New Arrivals"].map(
              (category) => (
                <li
                  key={category}
                  className="item js-category"
                  data-category={category}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      {/* Price Filter */}
      <div className="sidebar-item">
        <div className="sidebar-title">Price</div>
        <div className="sidebar-content">
          <div className="price-bar">
            <input
              type="text"
              placeholder="0"
              className="input"
              id="min-price"
            />
            <input
              type="text"
              placeholder="200"
              className="input"
              id="max-price"
            />
          </div>
        </div>
      </div>
      {/* Colors */}
      <div className="sidebar-item">
        <div className="sidebar-title">Colors</div>
        <div className="sidebar-content">
          <div className="colors">
            {/* Color Options */}
            {["Black", "Blue", "Red", "Brown", "Green"].map((color) => (
              <div className="color" key={color}>
                <input
                  type="checkbox"
                  className="color-checkbox js-color"
                  id={color.toLowerCase()}
                  name={color.toLowerCase()}
                  value={color}
                />
                <label htmlFor={color.toLowerCase()} className="color-name">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Apply Button */}
      <div className="sidebar-item">
        <div className="button-wrapper">
          <button className="button" id="apply-filter" disabled>
            Apply Filter
          </button>
          <div className="vertical-line"></div>
        </div>
      </div>
      {/* Reviewed Products */}
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
      {/* Banner */}
      <div>
        <a href="#">
          <img
            src="./images/season-sale-banner.svg"
            alt="season-sale-banner"
            className="season-sale-banner"
          />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
