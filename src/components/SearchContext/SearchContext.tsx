import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import fetchResults from '../../api/FetchResult';
import { SearchContextType, StarWarsCharacter } from '../../type/interfaces';

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<StarWarsCharacter[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPageResults = async (term: string, currentPage: number) => {
    setIsLoading(true);
    try {
      const fetchedResults = await fetchResults(term, currentPage);
      setResults(fetchedResults.results);
      setCount(fetchedResults.count);
    } catch (error) {
      console.error('Executing fetch error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageResults(searchTerm, page);
  }, [searchTerm, page]);

  const contextValue = useMemo(() => {
    return {
      searchTerm,
      setSearchTerm,
      results,
      setResults,
      count,
      setCount,
      page,
      setPage,
      isLoading,
      setIsLoading,
      fetchPageResults,
    };
  }, [searchTerm, results, count, page, isLoading]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
