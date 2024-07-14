function validateURL(url) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?"+ // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|"+ // domain name and extension
    "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
    "(\\:\\d+)?"+ // port
    "(\\/[-a-z\\d%_.~+]*)*"+ // path
    "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
    "(\\#[-a-z\\d_]*)?$", "i" // fragment locator
  );
  return !!urlPattern.test(url);
}

module.exports = { validateURL };
