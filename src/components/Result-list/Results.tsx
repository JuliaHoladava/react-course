import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultsProps, StarWarsCharacter } from '../../type/interfaces';
import './Results.css';
import Pagination from '../Pagination/Pagination';
import Details from '../Details/Details';

const Results: React.FC<ResultsProps> = ({
  initialResults,
  count,
  page,
  goToPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<StarWarsCharacter[]>(initialResults);
  const [selectedCharacter, setSelectedCharacter] =
    useState<StarWarsCharacter | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getIdFromUrl = (url: string): string => {
    const parts = url.replace(/\/$/, '').split('/');
    return parts[parts.length - 1];
  };

  useEffect(() => {
    const updatedResults = initialResults.map((character) => ({
      ...character,
      id: getIdFromUrl(character.url),
    }));
    setResults(updatedResults);
  }, [initialResults]);

  useEffect(() => {
    const detailsId = searchParams.get('details');
    const newPageParam = page.toString();

    if (
      searchParams.get('page') !== newPageParam ||
      (detailsId && searchParams.get('details') !== detailsId)
    ) {
      const newSearchParams: Record<string, string> = {
        ...Object.fromEntries(searchParams.entries()),
        page: newPageParam,
      };

      if (detailsId) {
        newSearchParams.details = detailsId;
      }

      setSearchParams(newSearchParams, { replace: true });
    }

    if (detailsId) {
      const character = results.find(
        (char) => getIdFromUrl(char.url) === detailsId
      );
      setSelectedCharacter(character || null);
      setShowDetails(!!character);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, results, searchParams]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleCharacterClick = (char: StarWarsCharacter) => {
    setSelectedCharacter(char);
    setShowDetails(true);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      details: getIdFromUrl(char.url),
    });
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
    setShowDetails(false);
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      <div className="_container result">
        <div className="left-section">
          {results.map((result) => (
            <div
              key={result.id}
              className="card"
              onClick={() => handleCharacterClick(result)}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleCharacterClick(result)
              }
              role="button"
              tabIndex={0}
            >
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
        {showDetails && selectedCharacter && (
          <div className="right-section">
            <Details character={selectedCharacter} />
            <button type="button" onClick={handleCloseDetails}>
              Close
            </button>
          </div>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} goToPage={goToPage} />
    </>
  );
};

export default Results;
