import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (isMobile) {
      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (currentPage <= 2) {
        pages.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    } else {
      if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 2) {
          pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages
          );
        }
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <li key={index} className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      return (
        <li
          key={index}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="custom-pagination-wrapper mt-4">
      <nav className="custom-pagination-nav">
        <button
          className="page-link prev-next d-flex"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <span>←</span>&nbsp;
          <span className="d-none d-md-flex">Previous</span>
        </button>

        <ul className="pagination custom-pagination">{renderPageNumbers()}</ul>

        <button
          className="page-link prev-next d-flex"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <span className="d-none d-md-flex">Next</span>&nbsp;<span>→</span>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
