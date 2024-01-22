const { Artwork, ArtworkTag, Tag } = require("../models");

const tagController = {
  getAllTags(req, res) {
    try {
      console.log(req);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getTagById(req, res) {
    try {
      console.log(req);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createTag(req, res) {
    try {
      console.log(req);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateTag(req, res) {
    try {
      console.log(req);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteTag(req, res) {
    try {
      console.log(req);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = tagController;
