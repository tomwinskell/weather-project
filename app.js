import { renderDropdown, filter } from './dropdown.js';
import fetchData from './fetchData.js';
import { validateInput, isLoaded } from './validation.js';
import { getCurrentWx } from './getWx.js';
import { renderWx } from './renderWx.js';

const input = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
const button = document.getElementById('submit');

let cities;

// load cities from json
async function main() {
  cities = await fetchData(true, './cities.json');
}

main();

input.addEventListener('input', () => {
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
});

// document.addEventListener('click', (e) => {
//   if (!e.target.closest('.table')) {
//     dropdown.classList.add('d-none');
//   }
// });

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    handleSubmit();
  }
});

button.addEventListener('click', () => {
  handleSubmit();
});

function handleSubmit() {
  dropdown.classList.add('d-none');
  const query = input.value.toLowerCase();
  const validInput = validateInput(cities.data, query);
  if (validInput) {
    (async () => {
      renderWx(await getCurrentWx(validInput), validInput);
    })();
  }
  input.value = '';
}

export { input, dropdown };
