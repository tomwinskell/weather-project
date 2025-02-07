let cities;
let isDataLoaded = false;

(async function getCities() {
  try {
    const res = await fetch('./cities.json');
    cities = await res.json();
    isDataLoaded = true;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

export { cities, isDataLoaded };