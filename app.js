import { renderDropdown, filter } from './dropdown.js';
import fetchData from './fetchData.js';
import { validateInput, isLoaded } from './validation.js';
import { getCurrentWx } from './getWx.js';
import { renderWx } from './renderWx.js';
import { deviceCoords } from './geoLocation.js';

const input = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
const button = document.getElementById('submit');

let cities;

// load cities from json
async function main() {
  cities = await fetchData(true, './cities.json');
}

deviceCoords();
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

function handleSubmit(query = input.value.toLowerCase()) {
  dropdown.classList.add('d-none');
  const validInput = validateInput(cities.data, query);
  if (validInput) {
    (async () => {
      renderWx(await getCurrentWx(validInput), validInput);
    })();
  }
  input.value = '';
}

export { input, dropdown };
