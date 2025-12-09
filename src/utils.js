const config = require('../config.json');

const utils = {
  formatEndpoint(endpoint) {
    return endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  },

  getFullURL(endpoint) {
    const cleanEndpoint = this.formatEndpoint(endpoint);
    return `${config.baseURL}/${cleanEndpoint}`;
  },

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': config.userAgent
    };
  },

  handleError(error) {
    if (error.response) {
      return error.response.data;
    }
    return {
      status: false,
      author: config.author,
      error: error.message || 'Network error'
    };
  }
};

module.exports = utils;
