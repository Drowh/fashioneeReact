export const ActivePageTop = ({ activePage, onTabChange }) => {

  const handleClick = (tab) => {
    onTabChange(tab);
  };
  return (
    <div className="container-active-page">
      <div className="active-page-top">
        <div className="block-left">
          <div className="text-inside-blockleft">
            <div className="title">{activePage}</div>
            <div className="about-page">
              <div className="vertical-line"></div>
              <div>Home</div>
              <div
                className={activePage === "Shop" ? "active-page" : ""}
                onClick={() => handleClick("shop")}
                style={{ cursor: "pointer"}}
              >
                Shop
              </div>
              <div
                className={activePage === "Cart" ? "active-page" : ""}
                onClick={() => handleClick("cart")}
                style={{ cursor: "pointer"}}
              >
                Cart
              </div>
            </div>
          </div>
          <img src="./icons/hr-line.svg" alt="hr-line" className="hr-line" />
        </div>
        <div className="img-top-right"></div>
        <img
          src="./images/points-top.svg"
          alt="points-top"
          className="points-top"
        />
      </div>
    </div>
  );
};

export default ActivePageTop;
