import { weatherData } from './app.js';

function forecastButton() {
  const collapseEl = document.getElementById('collapseEl');
  const button = document.getElementById('collapseBtn');
  button.addEventListener('click', () => {
    if (collapseEl.classList.contains('d-none')) {
      collapseEl.classList.remove('d-none');
      button.innerHTML = 'Hide Forecast';
      button.setAttribute('aria-expanded', 'true');
    } else {
      collapseEl.classList.add('d-none');
      button.innerHTML = 'Show Forecast';
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

function defaultButton() {
  const button = document.getElementById('setDefault');

  button.addEventListener('click', () => {
    setDefault(weatherData.weather.coord);
    createToast('Location added as default.');
  });

  function setDefault(latLon) {
    localStorage.setItem('latLon', JSON.stringify(latLon));
  }
}

function createToast(message) {
  const toast = document.getElementById('liveToast');
  toast.querySelector('.toast-body').innerHTML = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}

export { forecastButton, defaultButton };
