import { useState, useCallback } from "react";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ActivePageTop from "./components/ActivePageTop"; // Импортируем компонент
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { CartProvider } from "./contexts/CartContext";

import "./styles/reset.css";
import "./styles/commons.css";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("shop");

  // Используем useCallback для предотвращения ненужных ререндеров
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="App">
          <Header onTabChange={handleTabChange} />
          <main>
            <ActivePageTop
              activePage={activeTab === "shop" ? "Shop" : "Cart"}
              onTabChange={handleTabChange}
            />
            {activeTab === "shop" && <Shop />}
            {activeTab === "cart" && <Cart />}
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
