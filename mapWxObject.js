import { toLocalTime } from './getWx.js';
import { toTitleCase } from './helperFunctions.js';
import { daysOfWeek, monthsOfYear } from './dtStrings.js';

function buildWxObject(data) {
  const { weather, main, name } = data.weather;
  return {
    icon: weather[0].icon,
    cityName: name,
    description: toTitleCase(weather[0].description),
    temperature: main.temp,
  };
}

function buildFxObject(data) {
  const output = data.forecast.reduce((struct, current) => {
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
  return { forecast: output };
}

export { buildWxObject, buildFxObject };
