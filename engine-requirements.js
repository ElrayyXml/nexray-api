/**
 * Engine Requirements for NexRay API
 */

const axios = require('axios');
const FormData = require('form-data');
const config = require('./config.json');

class NexRayEngine {
  constructor(customConfig = {}) {
    // Merge config dari config.json dengan custom config
    this.config = {
      ...config,
      ...customConfig,
      defaultHeaders: {
        ...config.defaultHeaders,
        ...customConfig.defaultHeaders
      }
    };
    
    // Create axios instance
    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        ...this.config.defaultHeaders,
        'User-Agent': `${this.config.defaultHeaders['User-Agent']} (Node.js ${process.version})`
      },
      validateStatus: function (status) {
        return status < 500;
      }
    });
    
    this._setupInterceptors();
  }

  _setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(requestConfig => {
      requestConfig.metadata = {
        startTime: Date.now(),
        retryCount: 0,
        maxRetries: this.config.maxRetries
      };
      return requestConfig;
    });

    // Response interceptor for retry logic
    this.client.interceptors.response.use(
      response => response,
      async error => {
        const requestConfig = error.config;
        
        if (!requestConfig || !requestConfig.metadata) {
          return Promise.reject(error);
        }

        const { retryCount = 0, maxRetries } = requestConfig.metadata;
        const statusCode = error.response?.status;
        
        // Check if should retry
        const shouldRetry = !statusCode || this.config.retryStatusCodes.includes(statusCode);
        
        if (retryCount < maxRetries && shouldRetry) {
          const delay = this.config.retryDelay * Math.pow(2, retryCount);
          await new Promise(resolve => setTimeout(resolve, delay));
          
          requestConfig.metadata.retryCount = retryCount + 1;
          return this.client(requestConfig);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Get error message for status code
   * @param {number} status - HTTP status code
   * @returns {string}
   */
  getErrorMessage(status) {
    return this.config.errorMessages[status] || `Error ${status}`;
  }

  /**
   * Make HTTP request
   * @private
   */
  async _request(method, endpoint, data = null, params = null, options = {}) {
    try {
      const requestConfig = {
        method,
        url: endpoint.startsWith('/') ? endpoint.slice(1) : endpoint,
        ...options
      };

      // Handle data
      if (data) {
        if (data instanceof FormData) {
          requestConfig.data = data;
          requestConfig.headers = {
            ...requestConfig.headers,
            ...data.getHeaders()
          };
        } else {
          requestConfig.data = data;
        }
      }

      // Handle params
      if (params) {
        requestConfig.params = params;
      }

      const response = await this.client.request(requestConfig);
      
      // Return langsung response dari API
      return response.data;
      
    } catch (error) {
      if (error.response) {
        // Return langsung error response dari API
        return error.response.data;
      }
      
      // Network error atau timeout
      return {
        status: false,
        author: this.config.author,
        error: error.code === 'ECONNABORTED' 
          ? 'Request timeout' 
          : 'Network error - Cannot connect to server'
      };
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}, options = {}) {
    return this._request('GET', endpoint, null, params, options);
  }

  /**
   * POST request with JSON
   */
  async post(endpoint, data = {}, options = {}) {
    return this._request('POST', endpoint, data, null, options);
  }

  /**
   * POST request with FormData
   */
  async postForm(endpoint, formData = {}, options = {}) {
    const form = new FormData();
    
    // Append all form data
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.append(key, value);
      }
    });
    
    return this._request('POST', endpoint, form, null, {
      ...options,
      headers: {
        ...options.headers
      }
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}, options = {}) {
    return this._request('PUT', endpoint, data, null, options);
  }

  /**
   * DELETE request
   */
  async delete(endpoint, params = {}, options = {}) {
    return this._request('DELETE', endpoint, null, params, options);
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = {}, options = {}) {
    return this._request('PATCH', endpoint, data, null, options);
  }

  /**
   * GET request that returns Buffer (for images/files)
   */
  async getBuffer(endpoint, params = {}, options = {}) {
    try {
      const response = await this.client.get(
        endpoint.startsWith('/') ? endpoint.slice(1) : endpoint,
        {
          params,
          responseType: 'arraybuffer',
          ...options
        }
      );
      return Buffer.from(response.data);
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      }
      throw {
        status: false,
        author: this.config.author,
        error: 'Failed to download buffer'
      };
    }
  }

  /**
   * Set authentication token
   */
  setAuthToken(token) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Set custom header
   */
  setHeader(key, value) {
    this.client.defaults.headers.common[key] = value;
  }

  /**
   * Remove header
   */
  removeHeader(key) {
    delete this.client.defaults.headers.common[key];
  }

  /**
   * Set base URL
   */
  setBaseURL(baseURL) {
    this.config.baseURL = baseURL;
    this.client.defaults.baseURL = baseURL;
  }

  /**
   * Set timeout
   */
  setTimeout(timeout) {
    this.config.timeout = timeout;
    this.client.defaults.timeout = timeout;
  }

  /**
   * Get current configuration
   */
  getConfig() {
    return {
      ...this.config,
      currentHeaders: this.client.defaults.headers.common
    };
  }
}

module.exports = NexRayEngine;
