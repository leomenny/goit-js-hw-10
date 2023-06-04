import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const API_BASE_URL = 'https://restcountries.com/v3/name';

function renderCountryList(countries) {
  countryList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  countries.forEach((country) => {
    const { flags, name } = country;
    const listItem = document.createElement('div');
    listItem.classList.add('country-list-item');

    const flagImg = document.createElement('img');
    flagImg.src = flags.svg;
    flagImg.alt = name.common;
    flagImg.width = 30;

    const countryName = document.createElement('span');
    countryName.textContent = name.common;

    listItem.appendChild(flagImg);
    listItem.appendChild(countryName);
    fragment.appendChild(listItem);
  });

  countryList.appendChild(fragment);
}

function renderCountryInfo(country) {
  const { flags, name, capital, population, languages } = country;

  const languagesList = Object.values(languages).join(', ');

  countryInfo.innerHTML = `
    <img src="${flags.png}" alt="${name.common}" width="100" />
    <div class="country-info-item">
      <span>Name:</span> ${name.common}
    </div>
    <div class="country-info-item">
      <span>Capital:</span> ${capital}
    </div>
    <div class="country-info-item">
      <span>Population:</span> ${population.toLocaleString()}
    </div>
    <div class="country-info-item">
      <span>Languages:</span> ${languagesList}
    </div>
  `;

  countryInfo.style.display = 'block';
}

function handleSearchInput(event) {
  const searchTerm = event.target.value.trim();

  if (searchTerm.length > 0) {
    loader.style.display = 'block';
    error.style.display = 'none';

    fetchCountries(`${API_BASE_URL}/${searchTerm}`)
      .then((countries) => {
        loader.style.display = 'none';

        if (countries.length > 0) {
          renderCountryList(countries);
        } else {
          countryList.innerHTML = '';
          countryInfo.style.display = 'none';
          Notiflix.Notify.failure('No countries found!');
        }
      })
      .catch((error) => {
        loader.style.display = 'none';
        countryList.innerHTML = '';
        countryInfo.style.display = 'none';
        Notiflix.Notify.failure('Oops! Something went wrong!');
        console.error(error);
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.style.display = 'none';
  }
}

searchBox.addEventListener('input', debounce(handleSearchInput, 500));
