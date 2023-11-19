export interface PaginationProps {
  totalPages: number;
  page: number;
  goToPage: (page: number) => void;
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

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface DetailsProps {
  character: StarWarsCharacter;
}

export interface SearchState {
  searchTerm: string;
}

export interface ViewModelState {
  results: StarWarsCharacter[];
  count: number;
  page: number;
  isLoading: boolean;
}

export interface CharactersResponse {
  results: StarWarsCharacter[];
  count: number;
}

export interface FetchCharactersArguments {
  searchTerm: string;
  page: number;
}
