const axios = require('axios');
const config = require('../config.json');
const utils = require('./utils');

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

module.exports = NexRayAPI;
