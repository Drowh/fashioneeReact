import data from "../../../../products.json";
import { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import Search from "./components/Search";
import CategoryFilter from "./components/CategoryFilter";
import PriceFilter from "./components/PriceFilter";
import ColorFilter from "./components/ColorFilter";
import ApplyButton from "./components/ApplyButton";
import ReviewedByYou from "./components/ReviewedByYou";
import Banner from "./components/Banner";

const INITIAL_FILTERS = {
  category: "ALL",
  price: { min: "", max: "" },
  color: [],
};

const CATEGORIES_LIST = ["ALL", "Men", "Women", "Accessories", "New Arrivals"];

const Sidebar = ({ setSearchQuery, setSelectedFilters }) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const handleCategoryChange = useCallback((category) => {
    setFilters((prevFilters) => ({ ...prevFilters, category }));
  }, []);

  const handlePriceChange = useCallback((e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: { ...prevFilters.price, [id]: value || "" },
    }));
  }, []);

  const handleColorChange = useCallback((e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedColors = checked
        ? [...prevFilters.color, value]
        : prevFilters.color.filter((color) => color !== value);

      return {
        ...prevFilters,
        color: updatedColors,
      };
    });
  }, []);

  const applyFilters = useCallback(() => {
    setSelectedFilters(filters);
  }, [filters, setSelectedFilters]);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSelectedFilters(INITIAL_FILTERS);
  }, [setSelectedFilters]);

  return (
    <aside className="sidebar">
      <Search onSearchChange={handleSearchChange} />

      <CategoryFilter
        categories={CATEGORIES_LIST}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />

      <PriceFilter price={filters.price} onPriceChange={handlePriceChange} />

      <ColorFilter
        selectedColors={filters.color}
        onColorChange={handleColorChange}
      />

      <ApplyButton onApply={applyFilters} onReset={resetFilters} />

      <ReviewedByYou data={data} />

      <Banner />
    </aside>
  );
};

Sidebar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
};

export default memo(Sidebar);
