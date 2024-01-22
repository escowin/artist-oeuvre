const { dimensions } = require("../utils/helpers");

// Artwork dimensions string formatting
test("checks if array values are valid for string formatting", () => {
  const validValues1 = [4, 3, "in"];
  const validValues2 = [5.5, 2.45, "cm"];
  const validValues3 = [100, 200, "px"];
  const validValues4 = [8, 10, 2, "m"];

  const invalidValues1 = [4, 5];
  const invalidValues2 = [5, "cm"];
  const invalidValues3 = [100, "px", "extra"];
  const invalidValues4 = [4, "abc", "in"];
  const invalidValues5 = [8, 10, "m", 4];

  // Tests for valid array values
  expect(dimensions(validValues1)).toBe(true);
  expect(dimensions(validValues2)).toBe(true);
  expect(dimensions(validValues3)).toBe(true);
  expect(dimensions(validValues4)).toBe(true);

  // Tests for invalid array values
  expect(dimensions(invalidValues1)).toBe(false); // Missing unit
  expect(dimensions(invalidValues2)).toBe(false); // Invalid unit type
  expect(dimensions(invalidValues3)).toBe(false); // Extra value
  expect(dimensions(invalidValues4)).toBe(false); // Invalid numeric value
  expect(dimensions(invalidValues5)).toBe(false); // Invalid value order
});
