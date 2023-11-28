import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Results from '../components/Result-list/Results';
import Details from '../components/Details/Details';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { useFetchCharactersQuery } from '../api/starWarsCharactersApi';
import { StarWarsCharacter } from '../type/interfaces';

const HomePage = () => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<StarWarsCharacter | null>(null);
  const { data, error, isLoading } = useFetchCharactersQuery({
    searchTerm: '',
    page: 1,
  });

  const handleCharacterClick = (char: StarWarsCharacter) => {
    setSelectedCharacter(char);
    // setShowDetails(true);
    // setSearchParams({
    //   ...Object.fromEntries(searchParams.entries()),
    //   details: char.id,
    // });
  };

  // const handleCloseDetails = () => {
  //   setSelectedCharacter(null);
  //   setShowDetails(false);
  //   setSearchParams({ page: page.toString() });
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <ErrorBoundary>
      <SearchBar />
      <div>
        <Results data={data} onCharacterClick={handleCharacterClick} />
        {selectedCharacter && (
          <div className="right-section">
            <Details character={selectedCharacter} />
            {/* <button type="button" onClick={handleCloseDetails}>
              Close
            </button> */}
          </div>
        )}
      </div>
      {/* <Pagination
        page={page}
        totalPages={totalPages}
        goToPage={(newPage) =>
          setSearchParams({ search: searchTerm, page: newPage.toString() })
        }
      /> */}
    </ErrorBoundary>
  );
};

export default HomePage;
