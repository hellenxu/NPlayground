const request = require("request");
const { merge } = require('utils/utility.js');
const httpOpts = { simple: true, json: true };


class RequestApi {
  getStates(auth, token, phoneNum) {
    const url = `/api/v2/wls/account/${phoneNum}/states`;
    const headers = {
      "session-token": token,
      authorization: auth
    };
    return this.get(url, headers);
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