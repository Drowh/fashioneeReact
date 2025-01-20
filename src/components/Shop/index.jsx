import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import Newsletter from "./components/Newsletter";

import "../Shop/style.css";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "ALL",
    price: { min: "", max: "" },
    color: [],
  });

  return (
    <>
      <div className="container">
        <div className="shop">
          <Sidebar
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
            setSelectedFilters={setSelectedFilters}
          />
          <Products
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedFilters={selectedFilters}
          />
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default Shop;
