const { dimensions } = require("../utils/helpers");

// Dimension format string
test("checks for valid 'length × width' format", () => {
  const validString = "4 × 3";
  const invalidString = "invalid";

  // Tests for a valid & invalid string
  expect(dimensions(validString)).toBe(true);
  expect(dimensions(invalidString)).toBe(false);
});
