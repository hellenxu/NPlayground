const RequestApi = require("../RequestApi");
const auth = 'qwertyui';
const token = 'token2438204820384';
const phoneNum = '095445677';

describe("unit tests of RequestApi", () => {
  // request
  it("#getStates: called with specific url and headers", () => {
    const api = new RequestApi();
    const getSpy = jest.spyOn(api, 'get')
      .mockImplementation(() => {
        return {}
      });

    api.getStates(auth, token, phoneNum);

    const expectedUrl = `/api/v2/wls/account/${phoneNum}/states`;
    const expectedHeaders = {"session-token": token, authorization: auth};
    expect(getSpy).toBeCalledWith(expectedUrl, expectedHeaders);
  });

  // request promise array
  it('#getData: called with correct params and size of promises', () => {
    const api = new RequestApi();
    const result = api.getData(token, auth, [phoneNum]);
    expect(result.length).toBe(1);
    expect(result[0].method).toBe('GET');
    expect(result[0]._rp_options.url).toBe(`/api/v2/wls/account/${phoneNum}/data`)
  });

  // request promise with custom response
  it("#getDataDetails: should return proper response with valid input", () => {
    const api = new RequestApi();
    const getSpy = jest.spyOn(api, 'get')
      .mockImplementation(() => {
        return Promise.resolve({});
      });
    api.getDataDetails(token, auth, [phoneNum]);
    expect(getSpy).toBeCalled();
  });
});