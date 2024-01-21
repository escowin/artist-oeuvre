const User = require("./User");
const Artwork = require("./Artwork");

// model associations/relationships
// 1:M | A user (artist) can have many artworks
User.hasMany(Artwork, {
  foreignKey: "user_id",
});

Artwork.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Artwork };
