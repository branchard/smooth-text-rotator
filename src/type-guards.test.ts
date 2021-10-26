import {isArrayOfString} from "./type-guards";

test('should return true with an array of string', () => {
  expect(isArrayOfString(['a', 'b'])).toBe(true);
});

test('should return false with something else than an array', () => {
  expect(isArrayOfString('test')).toBe(false);
});

test('should return false with an array of numbers', () => {
  expect(isArrayOfString([1, 2, 3])).toBe(false);
});

test('should return false with an array of mixed types', () => {
  expect(isArrayOfString(['a', 1, 2, 'b'])).toBe(false);
});
