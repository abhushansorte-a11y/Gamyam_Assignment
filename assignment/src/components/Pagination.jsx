import React from 'react';
import './Pagination.css';

// Pagination Button Component (Reusable)
function PaginationButton({ page, isActive, onClick, disabled }) {
  return (
    <button
      className={`pagination-btn ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {page}
    </button>
  );
}

// Main Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate array of page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        className="pagination-btn prev-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="page-numbers">
        {pageNumbers.map(page => (
          <PaginationButton
            key={page}
            page={page}
            isActive={currentPage === page}
            onClick={() => onPageChange(page)}
            disabled={false}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        className="pagination-btn next-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;
