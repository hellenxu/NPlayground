const request = require("request-promise");
const _ = require('lodash');
/**
 * jest cannot find other files error:
 * it's because the path is incorrect. file path
 * should be the whole path from root dir. for example,
 * the root dir of this project is NPlayground, so in order to
 * find utils.js, the correct path should be ../utility/utils,
 * not /utility/utils.
 */
const { merge } = require('../utility/utils');
const httpOpts = { simple: true, json: true };
const apiVersion = 'v2';

class RequestApi {
  getStates(auth, token, phoneNum) {
    const url = `/api/${apiVersion}/wls/account/${phoneNum}/states`;
    const headers = {
      "session-token": token,
      authorization: auth
    };
    return this.get(url, headers);
  }

  getData(token, auth, phoneNumList) {
    const dataPromises = [];
    _.forEach(phoneNumList, (phoneNumber) => {
      const url = `/api/${apiVersion}/wls/account/${phoneNumber}/data`;
      dataPromises.push(this.get(url, { 'session-token': token, auth }))
    });
    return dataPromises
  }

  get(url, headers) {
    return this._request('GET', url, headers);
  }

  _request(method, url, headers, options = {}, body) {
    const opts = {
      url,
      method
    };
    if (headers !== null) {
      opts.headers = headers;
    }
    if (body !== null) {
      opts.body = body;
    }
    const requestOpts = merge({}, httpOpts, opts, options);
    return request(requestOpts)
  }
}

module.exports = RequestApi;