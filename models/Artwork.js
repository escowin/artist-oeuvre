const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { dimensions } = require("../utils/helpers");

class Artwork extends Model {}

Artwork.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 75],
      },
    },
    year: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    medium: {
      type: DataTypes.STRING,
    },
    dimensions: {
      type: DataTypes.STRING,
      validate: {
        isFormatted: (values) => dimensions(values) || "Invalid format",
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 180],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "artwork",
  }
);

module.exports = Artwork;
