import fetchData from './fetchData.js';

function deviceCoords() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (p) => handleSubmit(p),
      getIpapiLocation,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    getIpapiLocation();
  }
}

async function getIpapiLocation() {
  try {
    const res = await fetchData(true, 'https://ipapi.co/json/');
    console.log(res.data.latitude, res.data.longitude);
  } catch (error) {
    console.error('Error fetching IP-based location:', error);
  }
}

export { deviceCoords };
