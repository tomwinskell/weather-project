function toTitleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function createToast(message) {
  const toast = document.getElementById('liveToast');
  toast.querySelector('.toast-body').innerHTML = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}

function extractYearMonthDateDay(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
  };
}

export { toTitleCase, createToast, extractYearMonthDateDay };
