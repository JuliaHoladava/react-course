import React from 'react';
import { PaginationProps } from '../../type/interfaces';
// import './Pagination.css';

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  goToPage,
}) => {
  const goToNextPage = () => goToPage(page + 1);
  const goToPreviousPage = () => goToPage(page - 1);

  const renderPagination = (): JSX.Element[] => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={() => goToPage(i)}
          disabled={page === i}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="_container pagination">
      <button type="button" onClick={goToPreviousPage} disabled={page === 1}>
        Prev
      </button>
      {renderPagination()}
      <button
        type="button"
        onClick={goToNextPage}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
