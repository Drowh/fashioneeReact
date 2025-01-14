import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import Newsletter from "./components/Newsletter";

import '../Shop/shop.css';


const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  return (
    <>

      <div className="container">
        <div className="shop">
          <Sidebar
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />

          <Products
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      <Newsletter />
    
    </>
  );
};

export default Shop;
