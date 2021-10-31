const Axios = require("axios");

const { stringify } = require("qs");

const METHODS = [
  "get",
  "post",
  "put",
  "delete",
  "connect",
  "head",
  "options",
  "trace"
];

const Intercept = {
  Request: {
    data: {},
    headers: {},
    every: () => {}
  },
  Response: {
    success() {},
    error() {}
  }
};

let exp,
  preset = {};

function check() {
  return [undefined, "undefined"].includes(typeof uni) ? undefined : uni;
}

function empty(target) {
  if (target === undefined) {
    return true;
  }
  for (let i in target) {
    return false;
  }
  return true;
}

function merge(origin, target, result = { ...origin }) {
  Object.keys(result).map(key => {
    result[key] =
      typeof result[key] === "object"
        ? {
            ...(empty(origin[key]) ? {} : origin[key]),
            ...(empty(result[key]) ? {} : result[key]),
            ...(empty(target[key]) ? {} : target[key])
          }
        : origin[key] || result[key] || target[key];
  });
  if (result.every) {
    delete result.every;
  }
  return result;
}

function help(url, method, data = {}, headers = {}) {
  // Interceptor
  const { Request, Response } = Intercept;

  // Options
  const options = {
    url,
    method,
    data,
    headers
  };

  // Every
  const every = Request.every(options, url);

  // Inject Every Data 2 Options
  if (every.data) {
    options.data = { ...options.data, ...every.data };
  }

  // Case
  if (!exp) {
    // No Thing Impossible
  }

  // Preset
  preset = merge(Request, every, options);

  // Exp
  exp = Axios.create(preset);

  // Data Cache
  let cache = {
    ...[{ params: options.data }, options.data][
      [`put`, `post`, `patch`].includes(method) - 0
    ]
  };

  // Form Data Format
  if (
    ~options.headers["Content-Type"].indexOf(
      "application/x-www-form-urlencoded"
    ) &&
    method === "post"
  ) {
    cache = stringify(cache);
  }

  // Result
  return check()
    ? new Promise((resolve, reject) => {
        // Headers Error
        uni.request({
          ...preset,
          ...options,
          success: response => resolve(Response.success(response)),
          fail: error => reject(Response.error(error))
        });
      })
    : exp[method](url, cache)
        .then(response => Response.success(response))
        .catch(error => Response.error(error));
}

function http(host, url, handler = {}) {
  if (!url) {
    return console.error(`url is not defined .`);
  }
  METHODS.map(method => {
    handler[method.toLowerCase()] = (data, headers) =>
      help(url, method, data, headers);
  });
  return handler;
}

export default (
  host = `${location.protocol}//${location.host}`,
  interceptor = () => {},
  kit = {}
) => {
  Object.assign(Intercept, interceptor(Intercept, kit) || {});
  return url => http(host, url);
};
