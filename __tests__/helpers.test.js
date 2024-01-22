const { dimensions } = require("../utils/helpers");

// Dimensions format string
test("checks if array values are valid for 'length unit × width unit' format", () => {
  const validValues1 = [4, 3, "in"];
  const validValues2 = [5.5, 2.45, "cm"];
  const validValues3 = [100, 200, "px"];

  const invalidValues1 = [4, 5];
  const invalidValues2 = [5, "cm"];
  const invalidValues3 = [100, "px", "extra"];
  const invalidValues4 = [4, "abc", "in"];

  // Tests for valid array values
  expect(dimensions(validValues1)).toBe(true);
  expect(dimensions(validValues2)).toBe(true);
  expect(dimensions(validValues3)).toBe(true);

  // Tests for invalid array values
  expect(dimensions(invalidValues1)).toBe(false); // Missing unit
  expect(dimensions(invalidValues2)).toBe(false); // Invalid unit type
  expect(dimensions(invalidValues3)).toBe(false); // Extra value
  expect(dimensions(invalidValues4)).toBe(false); // Invalid numeric value
});
