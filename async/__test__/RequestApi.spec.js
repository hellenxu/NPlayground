const RequestApi = require("../RequestApi");
const auth = 'qwertyui';
const token = 'token2438204820384';
const phoneNum = '095445677';

describe("unit tests of RequestApi", () => {
  it("#getStates: called with specific url and headers", () => {
    const api = RequestApi();
    const requestSpy = jest.spyOn(api, "get")
      .mockImplemetation(() => {
        return {};
      });

    api.getStates(auth, token, phoneNum);

    const expectedUrl = `/api/v2/wls/account/${phoneNum}/states`;
    const expectedHeaders = {"session-token": token, authorization: auth};
    expect(requestSpy).toBeCalledWith(expectedUrl, expectedHeaders);
  });
});