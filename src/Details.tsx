import React from 'react';
import { DetailsProps } from './interfaces';

const Details: React.FC<DetailsProps> = ({ character }) => {
  return (
    <div>
      <div>
        <h2>{character.name}</h2>
        <p>Height: {character.height ? character.height : 'No data'}</p>
        <p>Mass: {character.mass ? character.mass : 'No data'}</p>
        <p>
          Hair color: {character.hair_color ? character.hair_color : 'No data'}
        </p>
        <p>
          Skin color: {character.skin_color ? character.skin_color : 'No data'}
        </p>
        <p>
          Eye color: {character.eye_color ? character.eye_color : 'No data'}
        </p>
        <p>
          Birth year: {character.birth_year ? character.birth_year : 'No data'}
        </p>
        <p>Gender: {character.gender ? character.gender : 'No data'}</p>
        <p>
          Homeworld: {character.homeworld ? character.homeworld : 'No data'}
        </p>
      </div>
    </div>
  );
};

export default Details;
