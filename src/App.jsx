import { useState } from "react";
import Shop from "./components/Shop";
import Card from "./components/Card";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./styles/reset.css";
import "./styles/commons.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("shop");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header onTabChange={handleTabChange} activeTab={activeTab} />
      {activeTab === "shop" && <Shop />}
      {activeTab === "card" && <Card />}
      <Footer />
    </>
  );
};

export default App;
