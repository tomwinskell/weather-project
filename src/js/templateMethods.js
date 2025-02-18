// pass filename, returns html as string
async function loadTemplate(filename) {
  const res = await fetch(`../templates/${filename}.html`);
  return await res.text();
}

function populateTemplate(object, htmlAsString) {
  for (const key in object) {
    // if object key is array logic will look for loop
    if (Array.isArray(object[key])) {
      const keyString = `{{for ${key}}}`;
      const indexOfFirst = htmlAsString.indexOf(keyString);
      const indexOfSecond = htmlAsString.indexOf(
        `{{end for}}`,
        indexOfFirst + 1
      );

      // find and get for loop placeholder string from the html template
      function getLoopPlaceholder() {
        return htmlAsString
          .substring(indexOfFirst, indexOfSecond + 12)
          .replace(keyString, '')
          .replace(`{{end for}}`, '');
      }

      // use object to populate for loop template
      function fillLoopPlaceholder() {
        return object[key].reduce((struct, current) => {
          let string = getLoopPlaceholder();
          for (const k in current) {
            string = string.replace(`{{${k}}}`, current[k]);
          }
          return (struct += string);
        }, '');
      }

      // replace for loop placeholder with new html
      function injectHtml() {
        return (
          htmlAsString.slice(0, indexOfFirst) +
          fillLoopPlaceholder() +
          htmlAsString.slice(indexOfSecond + keyString.length)
        );
      }
      htmlAsString = injectHtml();
    }
    htmlAsString = htmlAsString.replace(`{{${key}}}`, object[key]);
  }
  return htmlAsString;
}

function appendTemplate(htmlAsString, domElement) {
  domElement.insertAdjacentHTML('beforeend', htmlAsString);
}

export { loadTemplate, populateTemplate, appendTemplate };
