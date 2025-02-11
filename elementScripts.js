function forecastButton() {
  const collapseEl = document.getElementById('collapseForecast');
  const button = collapseEl.previousElementSibling;
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

export { forecastButton };
