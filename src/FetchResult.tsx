async function fetchResults(searchTerm: string) {
  const url = `https://swapi.dev/api/people/?search=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}

export default fetchResults;
