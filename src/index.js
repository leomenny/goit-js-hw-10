import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";
import { renderCountryMarkup } from "./countryMarkup";

const DEBOUNCE_DELAY = 300;

export const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info')
};

const debouncedFetchCountries = debounce(() => {
  const searchValue = refs.searchBox.value.trim();
  fetchCountries(searchValue)
  .then(countries => {
    renderCountryMarkup(countries);
  })
}, DEBOUNCE_DELAY);

refs.searchBox.addEventListener('input', debouncedFetchCountries);
