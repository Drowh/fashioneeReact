import { useMemo } from "react";

// Вспомогательная функция для безопасного преобразования цены в число
const safeNumberPrice = (price) => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? 0 : numPrice;
};

const useFilteredAndSortedProducts = (
  products,
  searchQuery,
  selectedFilters,
  sortType
) => {
  // Мемоизируем результаты фильтрации
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Фильтрация по поисковому запросу
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Фильтрация по категории
      const matchesCategory =
        !selectedFilters.category ||
        selectedFilters.category === "ALL" ||
        (Array.isArray(product.categories) &&
          product.categories.includes(selectedFilters.category));

      // Фильтрация по цене
      const productPrice = safeNumberPrice(product.price);
      const minPrice = selectedFilters.price?.min
        ? safeNumberPrice(selectedFilters.price.min)
        : 0;
      const maxPrice = selectedFilters.price?.max
        ? safeNumberPrice(selectedFilters.price.max)
        : Infinity;
      const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

      // Фильтрация по цвету
      const matchesColor =
        !selectedFilters.color ||
        !Array.isArray(selectedFilters.color) ||
        selectedFilters.color.length === 0 ||
        selectedFilters.color.includes(product.color);

      return matchesSearch && matchesCategory && matchesPrice && matchesColor;
    });
  }, [products, searchQuery, selectedFilters]);

  // Мемоизируем результаты сортировки
  return useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortType) {
        case "ASC":
          return a.name.localeCompare(b.name);
        case "DESC":
          return b.name.localeCompare(a.name);
        case "PRICE_ASC":
          return safeNumberPrice(a.price) - safeNumberPrice(b.price);
        case "PRICE_DESC":
          return safeNumberPrice(b.price) - safeNumberPrice(a.price);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortType]);
};

export default useFilteredAndSortedProducts;
