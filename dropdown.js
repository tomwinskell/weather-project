import { cities, isDataLoaded } from './getCities.js';

const input = document.getElementById('search');
const dropdown = document.getElementById('dropdown');

function updateDropdown() {
  // get user input
  const query = input.value.toLowerCase();
  // clear previous results
  dropdown.innerHTML = '';

  // if no user input display none dropdown
  if (!query) {
    dropdown.classList.add('d-none');
  }

  if (!isDataLoaded) {
    dropdown.innerHTML = 'Data is not loaded yet. Please wait.';
  }

  const filtered = cities
    .filter((city) => {
      return city.name.toLowerCase().includes(query);
    })
    .slice(0, 10);

  filtered.forEach((city) => {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    tr.setAttribute('style', 'cursor:pointer');
    td.textContent = city.name;
    tr.appendChild(td);
    tr.addEventListener('click', () => {
      input.value = city.name;
      dropdown.classList.add('d-none');
    });
    dropdown.appendChild(tr);
  });
  dropdown.classList.remove('d-none');
}

input.addEventListener('input', () => {
  updateDropdown();
  input.classList.remove('is-invalid');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.autocomplete-container')) {
    dropdown.classList.add('d-none');
  }
});
