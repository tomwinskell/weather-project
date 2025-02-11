// pass filename, returns html as string
async function loadTemplate(filename) {
  const res = await fetch(`./${filename}.html`);
  return await res.text();
}

function populateTemplate(object, htmlAsString) {
  for (const key in object) {
    htmlAsString = htmlAsString.replace(`{{${key}}}`, object[key]);
  }
  return htmlAsString;
}

function appendTemplate(htmlAsString, domElement) {
  domElement.insertAdjacentHTML('beforeend', htmlAsString);
}

export { loadTemplate, populateTemplate, appendTemplate };
