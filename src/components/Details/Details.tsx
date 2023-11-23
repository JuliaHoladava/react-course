import React from 'react';
import { DetailsProps } from '../../type/interfaces';

const Details: React.FC<DetailsProps> = ({ character }) => {
  const {
    name,
    height,
    mass,
    hair_color: hairColor,
    skin_color: skinColor,
    eye_color: eyeColor,
    birth_year: birthYear,
    gender,
    homeworld,
  } = character;
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>Height: {height || 'No data'}</p>
        <p>Mass: {mass || 'No data'}</p>
        <p>Hair color: {hairColor || 'No data'}</p>
        <p>Skin color: {skinColor || 'No data'}</p>
        <p>Eye color: {eyeColor || 'No data'}</p>
        <p>Birth year: {birthYear || 'No data'}</p>
        <p>Gender: {gender || 'No data'}</p>
        <p>Homeworld: {homeworld || 'No data'}</p>
      </div>
    </div>
  );
};

export default Details;
