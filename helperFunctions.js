function toTitleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export { toTitleCase };
