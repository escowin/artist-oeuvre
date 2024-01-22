module.exports = {
  tag_name_regex: (tag_name) => {
    const regex =
      /^[a-zA-Z0-9\s\u00C0-\u1FFF\u2C00-\uD7FF\u3040-\u30FF\u3100-\u312F\u4E00-\u9FFF\uAC00-\uD7AF]*$/u;
    if (!regex.test(tag_name)) {
      throw new Error("invalid tag name");
    }
    return true;
  },
  dimensions: (array) => {
    let height, width, depth, unit;

    // Determines whether or not artwork is 3D
    if (array.length === 4) {
      [height, width, depth, unit] = array;
    } else if (array.length === 3) {
      [height, width, unit] = array;
    } else {
      return false; // Invalid array length
    }

    // Checks for valid numeric values. Filters out `depth` in the case of 2D artwork
    if (
      ![height, width, depth]
        .filter((val) => typeof val !== "undefined")
        .every((val) => typeof val === "number") ||
      typeof unit !== "string"
    ) {
      return false;
    }

    // Formats the string to reflect either 2D & 3D artwork dimensions
    let formattedString =
      array.length === 4
        ? `${height} ${unit} × ${width} ${unit} × ${depth} ${unit}`
        : `${height} ${unit} × ${width} ${unit}`;

    // Applies validation on string
    const regex =
      /^(\d+(\.\d+)?)\s*\w+\s*×\s*(\d+(\.\d+)?)\s*\w+(\s*×\s*(\d+(\.\d+)?)\s*\w+)?$/;
    return regex.test(formattedString);
  },
};
