import './price.css'
const PriceFilter = ({ price, onPriceChange }) => {
    return (
      <div className="sidebar-item">
        <div className="sidebar-title">Price</div>
        <div className="sidebar-content">
          <div className="price-bar">
            <input
              type="text"
              id="min"
              placeholder="Min"
              className="input"
              value={price.min}
              onChange={onPriceChange}
            />
            <input
              type="text"
              id="max"
              placeholder="Max"
              className="input"
              value={price.max}
              onChange={onPriceChange}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default PriceFilter;
  