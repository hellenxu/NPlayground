const boss = require("../Boss");

var mockFn = jest.fn();
jest.mock("../Worker", ()=> {
  return {work: mockFn}
});

describe("Boss unit tests", () => {
  it("should call function work() and get correct response", function() {
    boss.instruct(20);
    expect(mockFn).toBeCalledWith(10)
  });
});