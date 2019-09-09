function replace(uri, exp = new RegExp(/\{\w+\}/g)) {
  if (exp.test(uri)) {
    uri.replace(exp, word => {});
  }

  return exp.test(uri)
    ? (j, o, e, n, i, x, a = 0, cache = [j, o, e, n, i, x]) =>
        uri.replace(exp, word => cache[a++])
    : uri;
}

function key(uri) {
  return uri
    .replace(/^\//, "")
    .replace(/\-/, "_")
    .replace(/\//g, "__");
}

export default (uris, links = {}) => {
  if (typeof uris == "function") {
    return uris(replace, key);
  }

  uris.map(uri => {
    links[key(uri)] = replace(uri);
  });

  return links;
};
