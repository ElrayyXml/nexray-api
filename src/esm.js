import axios from 'axios';
import config from '../config.json' assert { type: 'json' };

const utils = {
  formatEndpoint(endpoint) {
    return endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
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

class NexRayAPI {
  constructor() {
    this.client = axios.create({
      baseURL: config.baseURL,
      headers: utils.getHeaders()
    });
  }

  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(
        utils.formatEndpoint(endpoint),
        { params }
      );
      return response.data;
    } catch (error) {
      return utils.handleError(error);
    }
  }

  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(
        utils.formatEndpoint(endpoint),
        data
      );
      return response.data;
    } catch (error) {
      return utils.handleError(error);
    }
  }

  async put(endpoint, data = {}) {
    try {
      const response = await this.client.put(
        utils.formatEndpoint(endpoint),
        data
      );
      return response.data;
    } catch (error) {
      return utils.handleError(error);
    }
  }

  async delete(endpoint, params = {}) {
    try {
      const response = await this.client.delete(
        utils.formatEndpoint(endpoint),
        { params }
      );
      return response.data;
    } catch (error) {
      return utils.handleError(error);
    }
  }

  async patch(endpoint, data = {}) {
    try {
      const response = await this.client.patch(
        utils.formatEndpoint(endpoint),
        data
      );
      return response.data;
    } catch (error) {
      return utils.handleError(error);
    }
  }

  async getBuffer(endpoint, params = {}) {
    try {
      const response = await this.client.get(
        utils.formatEndpoint(endpoint),
        { 
          params, 
          responseType: 'arraybuffer' 
        }
      );
      return Buffer.from(response.data);
    } catch (error) {
      throw utils.handleError(error);
    }
  }

  setToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  setHeader(key, value) {
    this.client.defaults.headers.common[key] = value;
  }

  removeHeader(key) {
    delete this.client.defaults.headers.common[key];
  }
}

const api = new NexRayAPI();

export const get = (endpoint, params) => api.get(endpoint, params);
export const post = (endpoint, data) => api.post(endpoint, data);
export const put = (endpoint, data) => api.put(endpoint, data);
export const delete = (endpoint, params) => api.delete(endpoint, params);
export const patch = (endpoint, data) => api.patch(endpoint, data);
export const getBuffer = (endpoint, params) => api.getBuffer(endpoint, params);
export const setToken = (token) => api.setToken(token);
export const setHeader = (key, value) => api.setHeader(key, value);
export const removeHeader = (key) => api.removeHeader(key);

export default {
  get,
  post,
  put,
  delete,
  patch,
  getBuffer,
  setToken,
  setHeader,
  removeHeader
};
