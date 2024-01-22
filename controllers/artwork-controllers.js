const { Artwork } = require("../models");
const { format_dimensions } = require("../utils/helpers");

const artworkController = {
  async getAllArtwork(req, res) {
    try {
      const response = await Artwork.findAll();

      !response
        ? res.status(404).json({ message: "artworks not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getArtworkById({ params }, res) {
    try {
      const response = await Artwork.findOne({
        where: { id: params.id },
      });

      !response
        ? res.status(404).json({ message: "artwork not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createArtwork(req, res) {
    try {
      const response = await Artwork.create({
        title: req.body.title,
        year: req.body.year,
        medium: req.body.medium,
        dimensions: format_dimensions(req.body.dimensions),
        description: req.body.description,
        user_id: req.session.user_id,
      });

      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateArtwork(req, res) {
    try {
      const response = await Artwork.update(
        {
          title: req.body.title,
          year: req.body.year,
          medium: req.body.medium,
          dimensions: format_dimensions(req.body.dimensions),
          description: req.body.description,
          user_id: req.session.user_id,
        },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );

      !response
        ? res.status(404).json({ message: "artwork not found" })
        : res.json(response[1]);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteArtwork({ params }, res) {
    try {
      const response = await Artwork.destroy({
        where: { id: params.id },
      });

      !response
        ? res.status(404).json({ message: "artwork not found" })
        : res.json({ message: "artwork successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = artworkController;
