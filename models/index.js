const User = require("./User");
const Artwork = require("./Artwork");
const Tag = require("./Tag");
const ArtworkTag = require("./ArtworkTag");

// Model associations/relationships
// 1:M | User : Artwork
User.hasMany(Artwork, {
  foreignKey: "user_id",
});

Artwork.belongsTo(User, {
  foreignKey: "user_id",
});

// M:M | Artwork : Tag
Artwork.belongsToMany(Tag, {
  through: ArtworkTag,
  foreignKey: "artwork_id",
});

Tag.belongsToMany(Artwork, {
  through: ArtworkTag,
  foreignKey: "tag_id",
});

// tbd | SaleInfo model & 1:1 (Artwork:SaleInfo) associations

module.exports = { User, Artwork, ArtworkTag, Tag };
