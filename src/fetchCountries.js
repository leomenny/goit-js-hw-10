export function fetchCountries(searchValue) {
  const params = new URLSearchParams();
  params.set('fields', 'name,capital,languages,population,flags');
  const url = `https://restcountries.com/v3.1/name/${searchValue}?${params.toString()}`;

  if (searchValue === "") {
    return Promise.resolve([]);
  }

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.status === 404) {
        throw new Error("Country not found");
      }
      return data;
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
      return [];
    });
}


