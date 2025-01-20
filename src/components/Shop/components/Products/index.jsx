import { useState, useEffect } from "react";
import data from "../../../../products.json";
import useFilteredAndSortedProducts from "./hooks/useFilteredAndSortedProducts";
import useFavoriteProduct from "./hooks/useFavoriteProduct";
import ProductCard from "../Products/components/ProductCard";
import SortAndCount from "../Products/components/SortAndCount";
import Pagination from "../Products/components/Pagination";

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

  const pageCount = Math.ceil((filteredAndSortedProducts?.length || 0) / perPage);

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
      <SortAndCount
        productCount={productCount}
        perPage={perPage}
        setPerPage={setPerPage}
        sortType={sortType}
        handleSortChange={(e) => setSortType(e.target.value)}
      />
      <div className="products">
        {paginatedProducts.map((product) => {
          const { isFavoriteProduct, toggleFavorite } = favoriteMap[product.id] || {};
          return (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={isFavoriteProduct}
              toggleFavorite={toggleFavorite}
              handleAddToBasket={handleAddToBasket}
            />
          );
        })}
      </div>
      <Pagination
        activePage={activePage}
        pageCount={pageCount}
        handlePrevPage={() => activePage > 0 && setActivePage(activePage - 1)}
        handleNextPage={() => activePage < pageCount - 1 && setActivePage(activePage + 1)}
        handlePageClick={setActivePage}
      />
    </section>
  );
};

export default Products;
