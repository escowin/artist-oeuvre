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

  async getArtworkById(req, res) {
    try {
      const response = await Artwork.findOne({
        where: { id: req.params.id },
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
    //   console.log(req.body);
      console.log(format_dimensions(req.body.dimensions))

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
      console.log(req.body);
      console.log(req.params);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteArtwork(req, res) {
    try {
      console.log(req.params);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = artworkController;
