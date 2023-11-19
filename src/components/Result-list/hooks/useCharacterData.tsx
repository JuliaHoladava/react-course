import { useMemo } from 'react';
import { StarWarsCharacter } from '../../../type/interfaces';

const useCharacterData = (characters: StarWarsCharacter[] | undefined) => {
  const getIdFromUrl = (url: string): string => {
    const parts = url.replace(/\/$/, '').split('/');
    return parts[parts.length - 1];
  };

  return useMemo(
    () =>
      characters?.map((character: StarWarsCharacter) => ({
        ...character,
        id: getIdFromUrl(character.url),
      })) || [],
    [characters]
  );
};

export default useCharacterData;
