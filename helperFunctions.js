function toTitleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function createToast(message) {
  const toast = document.getElementById('liveToast');
  toast.querySelector('.toast-body').innerHTML = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}

export { toTitleCase, createToast };
