const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="sidebar-item">
      <div className="sidebar-title">Categories</div>
      <ul className="custom-list">
        {categories.map((category) => (
          <li
            key={category}
            className={`item ${selectedCategory === category ? "active" : ""}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
