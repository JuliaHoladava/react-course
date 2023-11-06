import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultsProps } from './interfaces';
import './Results.css';
import Pagination from './Pagination';

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
      <Pagination page={page} totalPages={totalPages} goToPage={goToPage} />
    </>
  );
};

export default Results;
