import data from "../../../../products.json";
import { useState, useCallback } from "react";
import Search from "./components/Search";
import CategoryFilter from "./components/CategoryFilter";
import PriceFilter from "./components/PriceFilter";
import ColorFilter from "./components/ColorFilter";
import ApplyButton from "./components/ApplyButton";
import ReviewedByYou from "./components/ReviewedByYou";
import Banner from "./components/Banner";

const Sidebar = ({
  setSearchQuery,
  setSelectedCategory,
  setSelectedFilters,
}) => {
  const [filters, setFilters] = useState({
    category: "ALL",
    price: { min: "", max: "" },
    color: [],
  });

  const categoriesList = ["ALL", "Men", "Women", "Accessories", "New Arrivals"];

  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  const handleCategoryChange = (category) => {
    setFilters((prevFilters) => ({ ...prevFilters, category }));
  };

  const handlePriceChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: { ...prevFilters.price, [id]: value || "" },
    }));
  };

  const handleColorChange = (e) => {
    const { value, checked } = e.target;
    const updatedColors = checked
      ? [...filters.color, value]
      : filters.color.filter((color) => color !== value);

    setFilters({
      ...filters,
      color: updatedColors,
    });
  };

  const applyFilters = () => {
    setSelectedFilters(filters);
  };

  return (
    <aside className="sidebar">
      <Search onSearchChange={handleSearchChange} />

      <CategoryFilter
        categories={categoriesList}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />

      <PriceFilter price={filters.price} onPriceChange={handlePriceChange} />

      <ColorFilter
        selectedColors={filters.color}
        onColorChange={handleColorChange}
      />

      <ApplyButton onApply={applyFilters} />

      <ReviewedByYou data={data} />

      <Banner />
    </aside>
  );
};

export default Sidebar;
