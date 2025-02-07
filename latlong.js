import { cities, isDataLoaded } from './getCities.js';
import { API_KEY } from './config.js';

let latLong;
let latLongLoaded = false;

const input = document.getElementById('search');
const button = document.getElementById('submit');

button.addEventListener('click', () => {
  let query = input.value.toLowerCase();
  query = validateInput(query);
  if (query) {
    getLatLong(query);
  }
});

function validateInput(query) {
  if (!isDataLoaded) {
    console.long('Data not loaded.');
  }
  const cityFound = cities.find((city) =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!cityFound) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    return false;
  }
  return cityFound;
}

async function getLatLong(q) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${q.name}&limit=1&appid=${API_KEY}`
  );
  latLong = await res.json();
  latLongLoaded = true;
  console.log(latLong);
}

export { latLong, latLongLoaded };
