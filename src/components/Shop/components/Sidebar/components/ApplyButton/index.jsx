const ApplyButton = ({ onApply }) => {
    return (
      <div className="sidebar-item">
        <div className="button-wrapper">
          <button className="button" onClick={onApply}>
            Apply Filter
          </button>
          <div className="vertical-line"></div>
        </div>
      </div>
    );
  };
  
  export default ApplyButton;
  