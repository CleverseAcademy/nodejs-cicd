import { max, min, avg } from "../src/utils";

describe("test max", () => {
  test("empty array should throw error", () => {
    expect(() => {
      max([]);
    }).toThrow();

    expect(() => {
      max([]);
    }).toThrowError("numbers was empty");
  });

  test("array with single element should return that element", () => {
    expect(max([1])).toEqual(1);
  });

  test("should return max in array", () => {
    const tests: [number[], number][] = [
      [[1, 2, 3], 3],
      [[-1, -2], -1],
      [[7, 8, 1], 8],
    ];

    tests.forEach((test) => {
      const [input, expected] = test;
      expect(max(input)).toEqual(expected);
    });
  });
});

describe("test min", () => {
  test("empty array should throw error", () => {
    expect(() => {
      min([]);
    }).toThrow();
    expect(() => {
      min([]);
    }).toThrowError("numbers was empty");
  });

  test("array with single element should return that element", () => {
    expect(min([-1])).toEqual(-1);
  });

  test("should return max in array", () => {
    const tests: [number[], number][] = [
      [[1, 2, 3], 1],
      [[-1, -2], -2],
      [[7, 8, 1], 1],
    ];

    tests.forEach((test) => {
      const [input, expected] = test;
      expect(min(input)).toEqual(expected);
    });
  });
});

describe("test avg", () => {
  test("empty array should throw error", () => {
    expect(() => {
      avg([]);
    }).toThrow();
    expect(() => {
      avg([]);
    }).toThrowError("numbers was empty");
  });

  test("array with single element should return that element", () => {
    expect(avg([33])).toEqual(33);
  });

  test("should return max in array", () => {
    const tests: [number[], number][] = [
      [[1, 2, 3], 2],
      [[-1, -2], -1.5],
      [[-10, 0, 10], 0],
    ];

    tests.forEach((test) => {
      const [input, expected] = test;
      expect(avg(input)).toEqual(expected);
    });
  });
});
