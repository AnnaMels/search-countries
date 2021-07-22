import { debounce } from 'lodash';

import fetchCountries from './fetchCountries.js';

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');


import countryCardTemplate from './templates/country-card.hbs';

import countryListTemplate from './templates/country-card-list.hbs';

  

const refs = {
   container: document.querySelector('.container'),
   input: document.querySelector('.search-input'),
   list: document.querySelector('.search-country-list'),
};

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
   e.preventDefault();

   const inputValue = e.target.value;
    if(inputValue === '') {
        return
    }

   fetchCountries(inputValue).then(countries => {
    if(countries.length === 1) {
        renderCountryCard(countries);
        
    } else if(countries.length > 2 && countries.length <= 10) {
        renderCountryList(countries);

    } else if(countries.length > 10) {
        error({
            text: "Too many matches found. Please enter a more specific query!"
          });

    } else if(countries.status === 404) {
        error({
            text: "No matches found. Please enter a more specific query!"
          });
    } 
})

};



function renderCountryCard(countryInfo) {
       const markup = countryCardTemplate(countryInfo[0]);
       refs.container.innerHTML = markup;
}

function renderCountryList(countries) {
    const markup = countries.map(it => countryListTemplate(it)).join('');
   
    //    const markup = countryListTemplate(
    //        {
    //            countries: countries
    //        }
    //    );
       refs.list.innerHTML = markup;
};


