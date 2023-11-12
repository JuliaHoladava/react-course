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

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  results: StarWarsCharacter[];
  setResults: (results: StarWarsCharacter[]) => void;
  count: number;
  page: number;
  setPage: (page: number) => void;
  isLoading: boolean;
}
