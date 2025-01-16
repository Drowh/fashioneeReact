import { useState, useEffect } from "react";
import data from "../../../../products.json";
import useFilteredAndSortedProducts from "./hooks/useFilteredAndSortedProducts";
import useFavoriteProduct from "./hooks/useFavoriteProduct";

const Products = ({ searchQuery, selectedCategory, selectedFilters }) => {
  const [productCount, setProductCount] = useState(0);
  const [sortType, setSortType] = useState("Relevance");
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const products = data.products || [];

  const favoriteMap = products.reduce((acc, product) => {
    const [isFavoriteProduct, toggleFavorite] = useFavoriteProduct(product.id);
    acc[product.id] = { isFavoriteProduct, toggleFavorite };
    return acc;
  }, {});

  const filteredAndSortedProducts = useFilteredAndSortedProducts(
    products,
    searchQuery,
    selectedFilters,
    sortType
  );

  useEffect(() => {
    setProductCount(filteredAndSortedProducts?.length || 0);
  }, [filteredAndSortedProducts]);

  const paginatedProducts = filteredAndSortedProducts?.slice(
    activePage * perPage,
    (activePage + 1) * perPage
  ) || [];

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handlePrevPage = () => {
    if (activePage > 0) setActivePage(activePage - 1);
  };

  const handleNextPage = () => {
    const pageCount = Math.ceil((filteredAndSortedProducts?.length || 0) / perPage);
    if (activePage < pageCount - 1) setActivePage(activePage + 1);
  };

  const handlePageClick = (pageIndex) => {
    setActivePage(pageIndex);
  };

  const handleAddToBasket = (product) => {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    const existingProduct = basket.find((p) => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      basket.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    updateHeaderCounts();
  };

  const updateHeaderCounts = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const basket = JSON.parse(localStorage.getItem("basket")) || [];
    let countInBasket = basket.reduce((acc, product) => acc + product.quantity, 0);
    let countInFavorites = favorites.length;
    document.querySelector(".js-favorites-counter").textContent = countInFavorites;
    document.querySelector(".js-basket-counter").textContent = countInBasket;
  };

  return (
    <section className="products-wrapper">
      <div className="sort-and-count">
        <div className="products-count">
          There are{" "}
          <span id="products-count" className="bold">
            {productCount}
          </span>{" "}
          products in this category
        </div>
        <div className="per-page-selector">
          <label htmlFor="per-page">Items per page:</label>
          <select
            id="per-page"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
        <div className="sort">
          <select
            className="input"
            id="sort"
            onChange={handleSortChange}
            value={sortType}
          >
            <option value="">Relevance</option>
            <option value="ASC">Name (A-Z)</option>
            <option value="DESC">Name (Z-A)</option>
            <option value="PRICE_ASC">Price (Low to High)</option>
            <option value="PRICE_DESC">Price (High to Low)</option>
          </select>
        </div>
      </div>
      <div className="products">
        {paginatedProducts.map((product) => {
          const { isFavoriteProduct, toggleFavorite } = favoriteMap[product.id] || {};

          return (
            <div key={product.id} className="product">
              <div className="photo">
                <div className="top-bar">
                  <div className="labels">
                    {product.isSale && <div className="label sale">Sale</div>}
                    {product.isNew && <div className="label new">New</div>}
                  </div>
                  <div className="favorites">
                    <img
                      src={
                        isFavoriteProduct
                          ? "./icons/heart-red.svg"
                          : "./icons/heart.svg"
                      }
                      alt="Favorite Icon"
                      className={`favorite-icon ${
                        isFavoriteProduct ? "filled" : ""
                      }`}
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
                  {product.oldPrice && (
                    <div className="old-price">${product.oldPrice}</div>
                  )}
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
        })}
      </div>
      <div className="pagination" id="pagination">
        <div className="button left" onClick={handlePrevPage}>
          <img
            src="./icons/left-pagin-arrow.svg"
            alt="left-pagin-arrow"
            className="left-pagin-arrow"
          />
        </div>
        <div className="pages">
          {Array.from(
            { length: Math.ceil((filteredAndSortedProducts?.length || 0) / perPage) },
            (_, i) => (
              <div
                key={i}
                className={`page ${i === activePage ? "active" : ""}`}
                onClick={() => handlePageClick(i)}
              >
                {i + 1}
              </div>
            )
          )}
        </div>
        <div className="button right" onClick={handleNextPage}>
          <img
            src="./icons/right-pagin-arrow.svg"
            alt="right-pagin-arrow"
            className="right-pagin-arrow"
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
