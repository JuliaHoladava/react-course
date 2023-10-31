export interface SearchBarProps {
  setSearchTerm: (searchTerm: string) => void;
}

export interface SearchBarState {
  localSearchTerm: string;
}

export interface ResultsProps {
  results: StarWarsCharacter[];
}

export interface AppState {
  searchTerm: string;
  results: StarWarsCharacter[];
}

export interface StarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  id: number;
}

export interface ApiResponse {
  results: StarWarsCharacter[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
