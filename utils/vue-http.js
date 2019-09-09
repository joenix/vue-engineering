const Axios = require("axios");

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
    header: {},
    every: () => {}
  },
  Response: {
    success() {},
    error() {}
  }
};

function help(url, method, data = {}, header = {}) {
  // Interceptor
  const { Request, Response } = Intercept;

  // Options
  const options = {
    url,
    method,
    data: { ...Request.data, ...data },
    header: { ...Request.header, ...header }
  };

  return typeof uni
    ? new Promise((resolve, reject) => {
        uni.request({
          ...options,
          ...Request.every(options),
          success: response => resolve(Response.success(response)),
          fail: error => reject(Response.error(error))
        });
      })
    : Axios({
        url,
        method,
        headers: options.header,
        ...[{ params: options.data }, { data: options.data }][
          [`put`, `post`, `patch`].includes(method) - 0
        ]
      })
        .then(response => Response.success(response))
        .catch(error => Response.error(error));
}

function http(host, url, handler = {}) {
  if (!url) {
    return console.error(`url is not defined .`);
  }
  METHODS.map(method => {
    handler[method.toLowerCase()] = (data, header) =>
      help(url, method, data, header);
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
