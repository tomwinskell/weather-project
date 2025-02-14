import { API_KEY } from './config.js';
import fetchData from './fetchData.js';
import { extractYearMonthDateDay } from './helperFunctions.js';

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
    forecast: reduceForecastData(fx.data),
    timezone: fx.data.city.timezone,
  };
}

function reduceForecastData(forecastData) {
  const { year, month, date } = extractYearMonthDateDay(
    forecastData.list[0].dt
  );
  return filterForMidday(
    getNoonForTimezone(forecastData.city.timezone, year, month, date),
    forecastData.list
  );
}

function getNoonForTimezone(timezoneOffset, year, month, day) {
  // 12pm given date + 1 day in UTC, store in a date object
  const noonUtc = new Date(Date.UTC(year, month, day + 1, 12, 0, 0));
  // change 12pm UTC to 12pm local using timezone offset from API
  // returned date is still in UTC
  return new Date(noonUtc.setTime(noonUtc.getTime() - timezoneOffset * 1000));
}

function filterForMidday(dateObject, dataArray) {
  const midday = Math.floor(dateObject.getTime() / 1000);
  // filter for closest timestamp to midday
  const closestIndex = dataArray.reduce(
    (closestIndex, current, index, array) => {
      if (
        Math.abs(current.dt - midday) <
        Math.abs(array[closestIndex].dt - midday)
      ) {
        closestIndex = index;
      }
      return closestIndex;
    },
    0
  );
  // remove forecast items before midday
  const newArray = dataArray.slice(closestIndex);

  // return 5 days
  return newArray.filter((item, index) => {
    if (index % 8 === 0) {
      return item;
    }
  });
}

export { getLatLon, getWxData };
