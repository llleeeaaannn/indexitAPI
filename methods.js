// Function to replace dots and hyphens with a forward slash
function replaceDotsAndHyphens(str) {
  return str.replace(/[.-]/g, '/');
}

export { replaceDotsAndHyphens }
