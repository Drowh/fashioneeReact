import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

const ApplyButton = ({ onApply, onReset }) => {
  return (
    <div className="sidebar-item">
      <div className="buttons-container">
        <button
          className="button apply-button"
          onClick={onApply}
          aria-label="Применить фильтры"
        >
          Apply Filter
        </button>
        <button
          className="button reset-button"
          onClick={onReset}
          aria-label="Сбросить фильтры"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

ApplyButton.propTypes = {
  onApply: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default memo(ApplyButton);
