import React from 'react';
import { ResultsProps } from './interfaces';
import './Results.css';

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div className="_container">
      {results.map((result) => (
        <div key={result.id} className="card">
          <h3>{result.name}</h3>
          <p>Height: {result.height ? result.height : 'No data'}</p>
          <p>Mass: {result.mass ? result.mass : 'No data'}</p>
          <p>Hair color: {result.hair_color ? result.hair_color : 'No data'}</p>
          <p>Skin color: {result.skin_color ? result.skin_color : 'No data'}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
