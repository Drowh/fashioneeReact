import '../Pagination/style.css'

const Pagination = ({ activePage, pageCount, handlePrevPage, handleNextPage, handlePageClick }) => (
    <div className="pagination" id="pagination">
      <div className="button left" onClick={handlePrevPage}>
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
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="button right" onClick={handleNextPage}>
        <img
          src="./icons/right-pagin-arrow.svg"
          alt="right-pagin-arrow"
          className="right-pagin-arrow"
        />
      </div>
    </div>
  );
  
  export default Pagination;
  