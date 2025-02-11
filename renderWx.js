import {
  appendTemplate,
  populateTemplate,
  loadTemplate,
} from './templateMethods.js';
import { toLocalTime } from './getWx.js';
import { daysOfWeek, monthsOfYear } from './dtStrings.js';
import { forecastButton } from './elementScripts.js';

const currentWxDiv = document.getElementById('currentWx');

async function renderWx(data, input) {
  // clear last data
  currentWxDiv.innerHTML = '';

  await loadPopulateAppend(
    buildWeatherObject(data, input),
    'weather',
    currentWxDiv
  );
  await loadPopulateAppend(
    { forecast: buildForecastObject(data) },
    'forecast',
    currentWxDiv
  );

  // load scripts specific to elements just loaded to dom
  forecastButton();
}

async function loadPopulateAppend(object, string, domElement) {
  appendTemplate(
    populateTemplate(object, await loadTemplate(string)),
    domElement
  );
}

function buildWeatherObject(data, cityName) {
  const { weather, main } = data.weather;
  return {
    icon: weather[0].icon,
    cityName: cityName,
    description: weather[0].description,
    temperature: main.temp,
  };
}

function buildForecastObject(data) {
  return data.forecast.reduce((struct, current) => {
    const localTime = new Date(toLocalTime(current.dt, data.timezone));
    const dateString = `${daysOfWeek[localTime.getDay()]}, ${
      monthsOfYear[localTime.getMonth()]
    } ${localTime.getDate()}`;
    struct += `
    <div class="col">
      <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" class="img-fluid" alt="...">
      <h5 class="card-title">${dateString}</h5>
      <p class="card-text">${current.weather[0].description}</p>
      <p class="card-text">${current.main.temp} degrees Celsius</p>
    </div>
    `;
    return struct;
  }, '');
}

export { renderWx };
