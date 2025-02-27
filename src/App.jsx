import { useState } from "react";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ActivePageTop from "./components/ActivePageTop"; // Импортируем компонент
import FavoritesProvider from "./contexts/FavoritesContext";
import CartProvider from "./contexts/CartContext";

import "./styles/reset.css";
import "./styles/commons.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("shop");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <FavoritesProvider>
      <CartProvider>
        <Header />
        <ActivePageTop 
        activePage={activeTab === "shop" ? "Shop" : "Cart"}
        onTabChange={handleTabChange}
         /> 
        {activeTab === "shop" && <Shop />}
        {activeTab === "cart" && <Cart />}
        <Footer />
      </CartProvider>
    </FavoritesProvider>
  );
};

export default App;
