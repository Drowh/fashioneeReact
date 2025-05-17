import { useContext, useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { FavoritesContext } from "../../../../contexts/FavoritesContext";
import { CartContext } from "../../../../contexts/CartContext";
import data from "../../../../products.json";
import useFilteredAndSortedProducts from "./hooks/useFilteredAndSortedProducts";
import ProductCard from "../Products/components/ProductCard";
import SortAndCount from "../Products/components/SortAndCount";
import Pagination from "../Products/components/Pagination";

const Products = ({
  searchQuery = "",
  selectedFilters = {
    category: "ALL",
    price: { min: "", max: "" },
    color: [],
  },
}) => {
  const [productCount, setProductCount] = useState(0);
  const [sortType, setSortType] = useState("Relevance");
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const products = data.products || [];

  const filteredAndSortedProducts = useFilteredAndSortedProducts(
    products,
    searchQuery,
    selectedFilters,
    sortType
  );

  useEffect(() => {
    setProductCount(filteredAndSortedProducts.length || 0);
    setActivePage(0);
  }, [filteredAndSortedProducts]);

  const paginatedProducts = filteredAndSortedProducts.slice(
    activePage * perPage,
    (activePage + 1) * perPage
  );

  const pageCount = Math.ceil(filteredAndSortedProducts.length / perPage);

  // Мемоизируем обработчики событий
  const handleSortChange = useCallback((e) => {
    setSortType(e.target.value);
  }, []);

  const handlePrevPage = useCallback(() => {
    setActivePage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNextPage = useCallback(() => {
    setActivePage((prev) => (prev < pageCount - 1 ? prev + 1 : prev));
  }, [pageCount]);

  const handlePageClick = useCallback((pageIndex) => {
    setActivePage(pageIndex);
  }, []);

  const handlePerPageChange = useCallback((newPerPage) => {
    setPerPage(newPerPage);
    setActivePage(0); // Сбрасываем на первую страницу при изменении количества элементов
  }, []);

  return (
    <section className="products-wrapper">
      <SortAndCount
        productCount={productCount}
        perPage={perPage}
        setPerPage={handlePerPageChange}
        sortType={sortType}
        handleSortChange={handleSortChange}
      />
      <div className="products">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={
              Array.isArray(favorites) && favorites.includes(product.id)
            }
            isInCart={
              Array.isArray(cart) && cart.some((item) => item.id === product.id)
            }
          />
        ))}
      </div>
      <Pagination
        activePage={activePage}
        pageCount={pageCount}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
      />
    </section>
  );
};

Products.propTypes = {
  searchQuery: PropTypes.string,
  selectedFilters: PropTypes.shape({
    category: PropTypes.string,
    price: PropTypes.shape({
      min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    color: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default memo(Products);
