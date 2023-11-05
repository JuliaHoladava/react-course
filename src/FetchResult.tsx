async function fetchResults(searchTerm: string, page: number) {
  const url = `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    results: data.results,
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
}

export default fetchResults;
