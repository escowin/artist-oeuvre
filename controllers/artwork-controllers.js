const { Artwork } = require("../models");

const artworkController = {
  async getAllArtwork(req, res) {
    try {
      console.log("get all artwork");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getArtworkById(req, res) {
    try {
        console.log(req.params);
      } catch (err) {
        res.status(500).json(err);
      }
  },

  async createArtwork(req, res) {
    try {
        console.log(req.body);
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
