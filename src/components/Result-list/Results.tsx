import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import Pagination from '../Pagination/Pagination';
// import Details from '../Details/Details';
// import { StarWarsCharacter } from '../../type/interfaces';
// import './Results.css';
// import { useFetchCharactersQuery } from '../../api/starWarsCharactersApi';
import useCharacterData from './hooks/useCharacterData';
import CharacterCard from '../CharacterCard/CharacterCard';

const Results = ({ data, onCharacterClick }) => {
  const resultsWithId = useCharacterData(data?.results);

  return (
    <div className="_container result">
      <div className="left-section">
        {resultsWithId.map((result) => (
          <CharacterCard
            key={result.id}
            character={result}
            onCharacterClick={() => onCharacterClick(character)}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
