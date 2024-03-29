const { Artwork, ArtworkTag, Tag } = require("../models");

const tagController = {
  // CRUD operations require an active user session.
  async getAllTags(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Tag.findAll({
        order: [["tag_name", "ASC"]],
      });

      !response
        ? res.status(404).json({ message: "tags not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getTagById(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Tag.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Artwork,
            through: ArtworkTag,
          },
        ],
      });

      !response
        ? res.status(404).json({ message: "tag not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createTag(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Tag.create({
        tag_name: req.body.tag_name,
      });

      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateTag(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Tag.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });

      !response
        ? res.status(404).json({ message: "tag not found" })
        : res.json(response[1]);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteTag(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Tag.destroy({
        where: { id: req.params.id },
      });

      !response
        ? res.status(404).json({ message: "tag not found" })
        : res.json({ message: "tag successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = tagController;
