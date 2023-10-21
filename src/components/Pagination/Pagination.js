import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

function Pagination({
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) 
{
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <span className="page-size-label">Items per page:</span>
      <select
        className="page-size-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        key={`page-size-select-${pageSize}`}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      <ul className="page-numbers">
        <li
          className={`page-number ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-number ${number === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`page-number ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default Pagination;
