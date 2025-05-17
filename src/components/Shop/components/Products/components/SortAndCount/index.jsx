import { memo } from "react";
import PropTypes from "prop-types";
import "../SortAndCount/style.css";

const SortAndCount = ({
  productCount,
  perPage,
  setPerPage,
  sortType,
  handleSortChange,
}) => (
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
        <option value="Relevance">Relevance</option>
        <option value="ASC">Name (A-Z)</option>
        <option value="DESC">Name (Z-A)</option>
        <option value="PRICE_ASC">Price (Low to High)</option>
        <option value="PRICE_DESC">Price (High to Low)</option>
      </select>
    </div>
  </div>
);

SortAndCount.propTypes = {
  productCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setPerPage: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};

export default memo(SortAndCount);
