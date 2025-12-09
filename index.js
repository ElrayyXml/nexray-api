const NexRayAPI = require('./src/index');

const api = new NexRayAPI();

const nexray = {
  get: (endpoint, params) => api.get(endpoint, params),
  post: (endpoint, data) => api.post(endpoint, data),
  put: (endpoint, data) => api.put(endpoint, data),
  delete: (endpoint, params) => api.delete(endpoint, params),
  patch: (endpoint, data) => api.patch(endpoint, data),
  getBuffer: (endpoint, params) => api.getBuffer(endpoint, params),
  setToken: (token) => api.setToken(token),
  setHeader: (key, value) => api.setHeader(key, value),
  removeHeader: (key) => api.removeHeader(key)
};

module.exports = nexray;
module.exports.default = nexray;
