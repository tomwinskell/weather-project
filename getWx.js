import { API_KEY } from './config.js';
import fetchData from './fetchData.js';

async function getLatLon(city) {
  const latLon = await fetchData(
    city,
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  return { lat: latLon.data[0].lat, lon: latLon.data[0].lon };
}

async function getWxData(latLon) {
  let { lat, lon } = latLon;
  lat = lat.toFixed(2);
  lon = lon.toFixed(2);
  const wx = await fetchData(
    latLon,
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const fx = await fetchData(
    latLon,
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return {
    weather: wx.data,
    forecast: mapFxData(fx.data, fx.data.city.timezone),
    timezone: fx.data.city.timezone,
  };
}

function mapFxData(fxData, timezone) {
  return fxData.list.filter((item) => isMidday(item.dt, timezone));
}

function isMidday(timestamp, timezoneOffset) {
  const date = toLocalTime(timestamp, timezoneOffset);
  return (
    date.getHours() === 11 || date.getHours() === 12 || date.getHours() === 13
  );
}

function toLocalTime(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000);
}

export { getLatLon, getWxData, toLocalTime };
