import { useContext, useState, useEffect } from "react";
import { FavoritesContext } from "../../../../contexts/FavoritesContext";
import { CartContext } from "../../../../contexts/CartContext";
import data from "../../../../products.json";
import useFilteredAndSortedProducts from "./hooks/useFilteredAndSortedProducts";
import ProductCard from "../Products/components/ProductCard";
import SortAndCount from "../Products/components/SortAndCount";
import Pagination from "../Products/components/Pagination";

const Products = ({ searchQuery, selectedFilters }) => {
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
  }, [filteredAndSortedProducts]);

  const paginatedProducts = filteredAndSortedProducts.slice(
    activePage * perPage,
    (activePage + 1) * perPage
  );

  const pageCount = Math.ceil(filteredAndSortedProducts.length / perPage);

  return (
    <section className="products-wrapper">
      <SortAndCount
        productCount={productCount}
        perPage={perPage}
        setPerPage={setPerPage}
        sortType={sortType}
        handleSortChange={(e) => setSortType(e.target.value)}
      />
      <div className="products">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            isInCart={cart.some((item) => item.id === product.id)}
          />
        ))}
      </div>
      <Pagination
        activePage={activePage}
        pageCount={pageCount}
        handlePrevPage={() => activePage > 0 && setActivePage(activePage - 1)}
        handleNextPage={() =>
          activePage < pageCount - 1 && setActivePage(activePage + 1)
        }
        handlePageClick={setActivePage}
      />
    </section>
  );
};

export default Products;
