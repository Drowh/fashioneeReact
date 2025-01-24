import { useState } from "react";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShopProvider from "./context/ShopContext";

import "./styles/reset.css";
import "./styles/commons.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("shop");
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  
  return (
    <ShopProvider>
      <Header onTabChange={handleTabChange} activeTab={activeTab} />
      {activeTab === "shop" && <Shop />}
      {activeTab === "cart" && <Cart />}
      <Footer />
      </ShopProvider>
  );
};

export default App;
