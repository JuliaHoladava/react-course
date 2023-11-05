import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultsProps } from './interfaces';
import './Results.css';

const Results: React.FC<ResultsProps> = ({ results, count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get('page') || '1', 10)
  );
  const itemsPerPage = 10;

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const totalPages = Math.ceil(count / itemsPerPage);
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);

  const renderPagination = (): JSX.Element[] => {
    const pages: JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={() => goToPage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="_container result">
        {currentItems.map((result) => (
          <div key={result.id} className="card">
            <h3>{result.name}</h3>
            <p>Height: {result.height ? result.height : 'No data'}</p>
            <p>Mass: {result.mass ? result.mass : 'No data'}</p>
            <p>
              Hair color: {result.hair_color ? result.hair_color : 'No data'}
            </p>
            <p>
              Skin color: {result.skin_color ? result.skin_color : 'No data'}
            </p>
          </div>
        ))}
      </div>
      <div className="_container pagination">
        <button
          type="button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {renderPagination()}
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Results;
