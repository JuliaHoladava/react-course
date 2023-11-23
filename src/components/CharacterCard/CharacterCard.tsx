import React from 'react';
import { StarWarsCharacter } from '../../type/interfaces';
import './CharacterCard.css';

interface CharacterCardProps {
  character: StarWarsCharacter;
  onCharacterClick: (char: StarWarsCharacter) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onCharacterClick,
}) => {
  const {
    id,
    name,
    height,
    mass,
    hair_color: hairColor,
    skin_color: skinColor,
  } = character;

  return (
    <div
      key={id}
      className="card"
      onClick={() => onCharacterClick(character)}
      onKeyDown={(e) => e.key === 'Enter' && onCharacterClick(character)}
      role="button"
      tabIndex={0}
    >
      <h3>{name}</h3>
      <p>Height: {height || 'No data'}</p>
      <p>Mass: {mass || 'No data'}</p>
      <p>Hair color: {hairColor || 'No data'}</p>
      <p>Skin color: {skinColor || 'No data'}</p>
    </div>
  );
};

export default CharacterCard;
