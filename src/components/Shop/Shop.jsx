import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Products from './components/Products';


const Shop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  return (
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
  );
};

export default Shop;
