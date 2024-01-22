const { dimensions_regex, format_dimensions } = require("../utils/helpers");

// Artwork dimensions string formatting
describe("dimensions_regex", () => {
  test("checks if a string is correctly formatted", () => {
    const validString1 = "4 in × 3 in";
    const validString2 = "5.5 cm × 2.45 cm";
    const validString3 = "100 px × 200 px";
    const validString4 = "8 m × 10 m × 2 m";

    const invalidString1 = "4 in × 5"; // Missing unit
    const invalidString2 = "5 cm"; // Invalid unit type
    const invalidString3 = "100 px extra"; // Extra value
    const invalidString4 = "4 abc in"; // Invalid numeric value
    const invalidString5 = "8 m × 10 m 4"; // Invalid value order

    // Tests for valid strings
    expect(() => dimensions_regex(validString1)).not.toThrow();
    expect(() => dimensions_regex(validString2)).not.toThrow();
    expect(() => dimensions_regex(validString3)).not.toThrow();
    expect(() => dimensions_regex(validString4)).not.toThrow();

    // Tests for invalid strings
    expect(() => dimensions_regex(invalidString1)).toThrow(); // Missing unit
    expect(() => dimensions_regex(invalidString2)).toThrow(); // Invalid unit type
    expect(() => dimensions_regex(invalidString3)).toThrow(); // Extra value
    expect(() => dimensions_regex(invalidString4)).toThrow(); // Invalid numeric value
    expect(() => dimensions_regex(invalidString5)).toThrow(); // Invalid value order
  });
});

describe("format_dimensions", () => {
  test("formats an array's values into a string", () => {
    const array1 = [4, 3, "in"];
    const array2 = [5.5, 2.45, "cm"];
    const array3 = [100, 200, "px"];
    const array4 = [8, 10, 2, "m"];

    const invalidArray1 = [4, 5]; // Missing unit
    const invalidArray2 = [5, "cm"]; // Invalid unit type
    const invalidArray3 = [100, "px", "extra"]; // Extra value
    const invalidArray4 = [4, "abc", "in"]; // Invalid numeric value
    const invalidArray5 = [8, 10, "m", 4]; // Invalid value order

    // Tests for valid arrays
    expect(format_dimensions(array1)).toBe("4 in × 3 in");
    expect(format_dimensions(array2)).toBe("5.5 cm × 2.45 cm");
    expect(format_dimensions(array3)).toBe("100 px × 200 px");
    expect(format_dimensions(array4)).toBe("8 m × 10 m × 2 m");

    // Tests for invalid arrays
    expect(format_dimensions(invalidArray1)).toBe(false); // Missing unit
    expect(format_dimensions(invalidArray2)).toBe(false); // Invalid unit type
    expect(format_dimensions(invalidArray3)).toBe(false); // Extra value
    expect(format_dimensions(invalidArray4)).toBe(false); // Invalid numeric value
    expect(format_dimensions(invalidArray5)).toBe(false); // Invalid value order
  });
});
