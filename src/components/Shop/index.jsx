import { useState, useMemo, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import Newsletter from "./components/Newsletter";

import "../Shop/style.css";

const INITIAL_FILTERS = {
  category: "ALL",
  price: { min: "", max: "" },
  color: [],
};

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState(INITIAL_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Мемоизируем передаваемые пропсы
  const sidebarProps = useMemo(
    () => ({
      setSearchQuery,
      setSelectedFilters,
    }),
    []
  );

  const productsProps = useMemo(
    () => ({
      searchQuery,
      selectedFilters,
    }),
    [searchQuery, selectedFilters]
  );

  // Переключение состояния сайдбара
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Закрытие сайдбара
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Обработчик для закрытия сайдбара по клику вне его области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".sidebar-mobile-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <div className="container">
        {/* Кнопка открытия сайдбара для мобильных устройств */}
        <div className="sidebar-mobile-toggle" onClick={toggleSidebar}>
          <div className={`hamburger ${sidebarOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="toggle-text">Фильтры</span>
        </div>

        <div className={`shop ${sidebarOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-container" ref={sidebarRef}>
            <div className="sidebar-header">
              <button
                className="sidebar-close-btn"
                onClick={closeSidebar}
                aria-label="Закрыть фильтры"
              >
                &times;
              </button>
              <h3>Фильтры</h3>
            </div>
            <Sidebar
              setSearchQuery={sidebarProps.setSearchQuery}
              setSelectedFilters={sidebarProps.setSelectedFilters}
            />
          </div>
          <Products
            searchQuery={productsProps.searchQuery}
            selectedFilters={productsProps.selectedFilters}
          />
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default Shop;
