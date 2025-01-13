import React, { useState, useEffect } from 'react';
import data from '../../../../products.json';

const Products = ({ searchQuery, selectedCategory }) => {
  const [productCount, setProductCount] = useState(0);
  const [sortType, setSortType] = useState('');
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(12);

  const products = data.products;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || product.categories.some(category => category === selectedCategory);
    return matchesSearch && matchesCategory;
  });
  

  // Сортировка продуктов
  const sortProducts = (products, sort) => {
    return [...products].sort((a, b) => {
      switch (sort) {
        case 'ASC':
          return a.name.localeCompare(b.name); // (A-Z)
        case 'DESC':
          return b.name.localeCompare(a.name); // (Z-A)
        case 'PRICE_ASC':
          return a.price - b.price; // (Low to High)
        case 'PRICE_DESC':
          return b.price - a.price; // (High to Low)
        default:
          return 0;
      }
    });
  };

  const sortedProducts = sortProducts(filteredProducts, sortType);

  const paginatedProducts = sortedProducts.slice(
    activePage * perPage,
    (activePage + 1) * perPage
  );

  useEffect(() => {
    setProductCount(filteredProducts.length);
  }, [filteredProducts]);

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handlePrevPage = () => {
    if (activePage > 0) setActivePage(activePage - 1);
  };

  const handleNextPage = () => {
    const pageCount = Math.ceil(filteredProducts.length / perPage);
    if (activePage < pageCount - 1) setActivePage(activePage + 1);
  };

  const handlePageClick = (pageIndex) => {
    setActivePage(pageIndex);
  };

  return (
    <section className="products-wrapper">
      {/* Sort and Count */}
      <div className="sort-and-count">
        <div className="products-count">
          There are{' '}
          <span id="products-count" className="bold">
            {productCount}
          </span>{' '}
          products in this category
        </div>
        {/* Items per page */}
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

      {/* Product List */}
      <div className="products js-products">
        {paginatedProducts.map((product) => (
          <div className="product" key={product.id}>
            <div className="photo">
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
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination" id="pagination">
        <div className="button left" onClick={handlePrevPage}>
          <img
            src="./icons/left-pagin-arrow.svg"
            alt="left-pagin-arrow"
            className="left-pagin-arrow"
          />
        </div>
        <div className="pages js-pages">
          {Array.from(
            { length: Math.ceil(filteredProducts.length / perPage) },
            (_, i) => (
              <div
                key={i}
                className={`page ${i === activePage ? 'active' : ''}`}
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
