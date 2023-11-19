import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import Details from '../Details/Details';
import { StarWarsCharacter } from '../../type/interfaces';
import './Results.css';
import { useFetchCharactersQuery } from '../../api/starWarsCharactersApi';
import useCharacterData from './hooks/useCharacterData';

const Results: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCharacter, setSelectedCharacter] =
    useState<StarWarsCharacter | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const searchTerm = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, error, isLoading } = useFetchCharactersQuery({
    searchTerm,
    page,
  });

  const resultsWithId = useCharacterData(data?.results);

  const count = data?.count || 0;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleCharacterClick = (char: StarWarsCharacter) => {
    setSelectedCharacter(char);
    setShowDetails(true);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      details: char.id,
    });
  };

  const handleCloseDetails = () => {
    setSelectedCharacter(null);
    setShowDetails(false);
    setSearchParams({ page: page.toString() });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <>
      <div className="_container result">
        <div className="left-section">
          {resultsWithId.map((result) => (
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
      <Pagination
        page={page}
        totalPages={totalPages}
        goToPage={(newPage) =>
          setSearchParams({ search: searchTerm, page: newPage.toString() })
        }
      />
    </>
  );
};

export default Results;
