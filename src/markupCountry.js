import { refs } from "./index.js";
import Notiflix from "notiflix";
export function renderCountryMarkup(countries) {
  const searchValue = refs.searchBox.value.trim();

  if (searchValue === "") {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length === 0) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  } else if (countries.length === 1) {
    const oneCountryMarkup = countries.map(country => `
      <div class="name-flag"> 
        <img class="country-flag" src="${country.flags.svg}" alt="Flag" width="30" height="30">
        <h2 class="country-name">${country.name.common}</h2>
      </div>
      <div class="country-details">
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
      </div>`
    ).join("");

    refs.countryInfo.innerHTML = oneCountryMarkup;
    refs.countryList.innerHTML = '';
  } else {
    refs.countryInfo.innerHTML = '';
    const countryMarkup = countries.map(country => `
      <div class="name-flag">
        <li><img class="country-flag" src="${country.flags.svg}" alt="Flag" width="30" height="30"></li>
        <li>${country.name.common}</li>
      </div>`).join("");
    refs.countryList.innerHTML = countryMarkup;
  }
}