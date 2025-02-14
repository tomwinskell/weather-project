import {
  appendTemplate,
  populateTemplate,
  loadTemplate,
} from './templateMethods.js';
import { forecastButton, defaultButton } from './elementScripts.js';
import { weatherData } from './app.js';
import { buildFxObject, buildWxObject } from './mapWxObject.js';

const wxDiv = document.getElementById('wx');

async function renderWx() {
  // clear last data
  wxDiv.innerHTML = '';

  await loadPopulateAppend(buildWxObject(weatherData), 'weather');
  await loadPopulateAppend(buildFxObject(weatherData), 'forecast');

  // load scripts specific to elements just loaded to dom
  forecastButton();
  defaultButton();
}

async function loadPopulateAppend(dataObject, string) {
  appendTemplate(
    populateTemplate(dataObject, await loadTemplate(string)),
    wxDiv
  );
}

export { renderWx };
