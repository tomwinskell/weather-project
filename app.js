import { renderDropdown, filter } from './dropdown.js';
import fetchData from './fetchData.js';
import { validateInput, isLoaded } from './validation.js';
import { getWxData, getLatLon } from './getWx.js';
import { renderWx } from './renderWx.js';
import { deviceCoords } from './geoLocation.js';

const input = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
const button = document.getElementById('submit');

// list of cities loaded from Json
let cities;
// weatherData from fetch
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
    // validate the users input using list of cities
    const valid = validateInput(cities.data, query);
    if (valid) {
      await setWeatherData(await getLatLon(valid));
      renderWx(weatherData, valid);
    }
  } else if (typeof query === 'object') {
    await setWeatherData(query);
    renderWx(weatherData);
  }
  input.value = '';

  // sets the global weather data variable
  async function setWeatherData(latLon) {
    weatherData = await getWxData(latLon);
  }
}

export { input, dropdown, handleSubmit, weatherData };
