export interface SearchBarProps {
  setSearchTerm: (searchTerm: string) => void;
}

export interface SearchBarState {
  localSearchTerm: string;
}

export interface ResultsProps {
  initialResults: StarWarsCharacter[];
  count: number;
  page: number;
  goToPage: (page: number) => void;
  isLoading: boolean;
}

export interface PaginationProps {
  totalPages: number;
  page: number;
  goToPage: (page: number) => void;
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
  url: string;
  id: string;
}

export interface ApiResponse {
  results: StarWarsCharacter[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface DetailsProps {
  character: StarWarsCharacter;
}
