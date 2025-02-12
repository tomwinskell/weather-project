import { renderDropdown, filter } from './dropdown.js';
import fetchData from './fetchData.js';
import { validateInput, isLoaded } from './validation.js';
import { getWxData, getLatLon } from './getWx.js';
import { renderWx } from './renderWx.js';
import { deviceCoords } from './geoLocation.js';

const input = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
const button = document.getElementById('submit');

let cities;
let weatherData;

// load cities from json
async function main() {
  cities = await fetchData(true, './cities.json');
  renderOnLoad();

  function renderOnLoad() {
    const latLon = JSON.parse(localStorage.getItem('latLon'));
    if (!latLon) {
      deviceCoords();
    } else {
      handleSubmit(latLon);
    }
  }
}

main();

input.addEventListener('input', () => handleInput());

input.addEventListener('keyup', (e) => e.key === 'Enter' && handleSubmit());

button.addEventListener('click', () => handleSubmit());

function handleInput() {
  const query = input.value.toLowerCase();
  // clear previous results
  dropdown.innerHTML = '';
  if (!query) {
    dropdown.classList.add('d-none');
    return;
  }
  if (!isLoaded(cities)) {
    return;
  }
  renderDropdown(filter(cities.data, query));
  input.classList.remove('is-invalid');
}

async function handleSubmit(query = input.value.toLowerCase()) {
  dropdown.classList.add('d-none');
  if (typeof query === 'string') {
    const valid = validateInput(cities.data, query);
    if (valid) {
      weatherData = await getWxData(await getLatLon(valid));
      renderWx(weatherData, valid);
    }
  } else if (typeof query === 'object') {
    weatherData = await getWxData(query);
    renderWx(weatherData);
  }
  input.value = '';
}

export { input, dropdown, handleSubmit, weatherData };
