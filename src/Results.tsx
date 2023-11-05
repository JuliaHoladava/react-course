import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultsProps } from './interfaces';
import './Results.css';

const Results: React.FC<ResultsProps> = ({
  results,
  count,
  page,
  goToPage,
}) => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

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
    <>
      <div className="_container result">
        {results.map((result) => (
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
    </>
  );
};

export default Results;
