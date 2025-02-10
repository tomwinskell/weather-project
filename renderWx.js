const currentWxDiv = document.getElementById('currentWx');
import { toLocalTime } from './getWx.js';

function renderWx(data, input) {
  const daysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  currentWxDiv.innerHTML = '';
  const { weather, main } = data.weather;
  const template = `
<div class="card mb-4 mx-auto" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
      <img src="https://openweathermap.org/img/wn/${
        weather[0].icon
      }@2x.png" class="img-fluid" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title">${input}</h4>
        <h5 class="card-title">Current Weather</h5>
        <p class="card-text">${weather[0].description}</p>
        <p class="card-text">${main.temp} degrees Celsius</p>
      </div>
    </div>
  </div>
</div>
<div>
<p class="d-inline-flex gap-1">
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Show Forecast
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body mb-4">
    <div class="container text-center">
  <div class="row">
  ${data.forecast.reduce((struct, current) => {
    const localTime = new Date(toLocalTime(current.dt, data.timezone));
    const dateString = `${
      daysOfWeek[localTime.getDay()]
    }, ${monthsOfYear[localTime.getMonth()]} ${localTime.getDate()}`;
    struct += `
    <div class="col">
      <img src="https://openweathermap.org/img/wn/${
        current.weather[0].icon
      }@2x.png" class="img-fluid" alt="...">
      <h5 class="card-title">${dateString}</h5>
      <p class="card-text">${current.weather[0].description}</p>
      <p class="card-text">${current.main.temp} degrees Celsius</p>
    </div>
    `;
    return struct;
  }, '')}
  </div>
</div>
  </div>
</div>
</div>
`;
  currentWxDiv.insertAdjacentHTML('afterbegin', template);
}

export { renderWx };
