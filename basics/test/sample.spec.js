const Sample = require("../sample");

describe("sample unit tests", () => {
  it("#getCountries fetch data properly", () => {
    const mockTransformer = {
      getCountries: jest.fn()
    };
    const sa = new Sample(mockTransformer);
    sa.getCountries();
    expect(mockTransformer.getCountries).toHaveBeenCalled();
  });
});