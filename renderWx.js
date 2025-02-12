import {
  appendTemplate,
  populateTemplate,
  loadTemplate,
} from './templateMethods.js';
import { toLocalTime } from './getWx.js';
import { daysOfWeek, monthsOfYear } from './dtStrings.js';
import { forecastButton, defaultButton } from './elementScripts.js';
import { toTitleCase } from './helperFunctions.js';

const currentWxDiv = document.getElementById('currentWx');

async function renderWx(data, input) {
  // clear last data
  currentWxDiv.innerHTML = '';

  await loadPopulateAppend(
    buildWeatherObject(data, input ? input : data.weather.name),
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
  defaultButton();
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
    description: toTitleCase(weather[0].description),
    temperature: main.temp,
  };
}

function buildForecastObject(data) {
  return data.forecast.reduce((struct, current) => {
    const localTime = new Date(toLocalTime(current.dt, data.timezone));
    const dateString = `${daysOfWeek[localTime.getDay()]}, ${
      monthsOfYear[localTime.getMonth()]
    } ${localTime.getDate()}`;
    struct.push({
      icon: current.weather[0].icon,
      dateString: dateString,
      description: toTitleCase(current.weather[0].description),
      temperature: current.main.temp,
    });
    return struct;
  }, []);
}

export { renderWx };
