import './style.css'
const ColorFilter = ({ selectedColors, onColorChange }) => {
    const colors = ["Black", "Blue", "Red", "Brown", "Green"];
  
    return (
      <div className="sidebar-item">
        <div className="sidebar-title">Colors</div>
        <div className="sidebar-content">
          <div className="colors">
            {colors.map((color) => (
              <div className="color" key={color}>
                <input
                  type="checkbox"
                  className="color-checkbox"
                  id={color.toLowerCase()}
                  value={color}
                  checked={selectedColors.includes(color)}
                  onChange={onColorChange}
                />
                <label htmlFor={color.toLowerCase()} className="color-name">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ColorFilter;
  