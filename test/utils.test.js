const utils = require("../src/utils");

describe("type error tests", () => {
  test("[min] NaN member should throw error", () => {
    expect(() => {
      utils.min([1, true]);
    }).toThrow();

    expect(() => {
      utils.min([1, "foo"]);
    }).toThrow();
  });

  test("[max] NaN member should throw error", () => {
    expect(() => {
      utils.max([1, true]);
    }).toThrow();

    expect(() => {
      utils.max([1, "foo"]);
    }).toThrow();
  });

  test("[avg] NaN member should throw error", () => {
    expect(() => {
      utils.avg([1, true]);
    }).toThrow();

    expect(() => {
      utils.avg([1, "foo"]);
    }).toThrow();
  });
});
