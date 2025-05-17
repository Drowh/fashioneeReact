import { memo } from "react";
import PropTypes from "prop-types";
import "../Pagination/style.css";

const Pagination = ({
  activePage,
  pageCount,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
}) => {
  // Если страниц нет, не отображаем пагинацию
  if (!pageCount || pageCount <= 0) {
    return null;
  }

  return (
    <div className="pagination" id="pagination">
      <div
        className="button left"
        onClick={handlePrevPage}
        role="button"
        aria-label="Previous page"
        tabIndex={0}
      >
        <img
          src="./icons/left-pagin-arrow.svg"
          alt="left-pagin-arrow"
          className="left-pagin-arrow"
        />
      </div>
      <div className="pages">
        {Array.from({ length: pageCount }, (_, i) => (
          <div
            key={i}
            className={`page ${i === activePage ? "active" : ""}`}
            onClick={() => handlePageClick(i)}
            role="button"
            tabIndex={0}
            aria-label={`Page ${i + 1}`}
            aria-current={i === activePage ? "page" : undefined}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div
        className="button right"
        onClick={handleNextPage}
        role="button"
        aria-label="Next page"
        tabIndex={0}
      >
        <img
          src="./icons/right-pagin-arrow.svg"
          alt="right-pagin-arrow"
          className="right-pagin-arrow"
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

export default memo(Pagination);
