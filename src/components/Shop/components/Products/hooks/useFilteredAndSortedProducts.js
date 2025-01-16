
import { useMemo } from "react";

const useFilteredAndSortedProducts = (products, searchQuery, selectedFilters, sortType) => {
  return useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedFilters.category === "ALL" ||
          product.categories.includes(selectedFilters.category);
        const matchesPrice =
          (!selectedFilters.price ||
            !selectedFilters.price.min ||
            product.price >= parseFloat(selectedFilters.price.min)) &&
          (!selectedFilters.price ||
            !selectedFilters.price.max ||
            product.price <= parseFloat(selectedFilters.price.max));

        const matchesColor =
          !selectedFilters.color ||
          selectedFilters.color.length === 0 ||
          selectedFilters.color.includes(product.color);

        return matchesSearch && matchesCategory && matchesPrice && matchesColor;
      })
      .sort((a, b) => {
        switch (sortType) {
          case "ASC":
            return a.name.localeCompare(b.name);
          case "DESC":
            return b.name.localeCompare(a.name);
          case "PRICE_ASC":
            return a.price - b.price;
          case "PRICE_DESC":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [products, searchQuery, selectedFilters, sortType]);
};

export default useFilteredAndSortedProducts;
