// Import our custom CSS
import '../scss/styles.scss';
// import fetchData from './fetchData.js';
import { deviceCoords } from './geoLocation.js';
import { handleInput, handleSubmit } from './handlers.js';
import cities from './cities.json';

const input = document.getElementById('search');
const dropdown = document.getElementById('dropdown');
const button = document.getElementById('submit');

// // list of cities loaded from Json
// let cities;

// load cities from json
async function main() {
  // cities = await fetchData(true, './cities.json');
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

export { input, dropdown, cities };
