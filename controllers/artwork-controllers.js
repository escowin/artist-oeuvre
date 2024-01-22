const { Artwork, Tag, ArtworkTag } = require("../models");
const { format_dimensions } = require("../utils/helpers");

const artworkController = {
  // CRUD operations require an active user session.
  async getAllArtwork(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Artwork.findAll({
        where: { user_id: req.session.user_id },
      });

      !response
        ? res.status(404).json({ message: "artworks not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getArtworkById(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Artwork.findOne({
        where: { id: req.params.id, user_id: req.session.user_id },
        include: [
          {
            model: Tag,
            through: ArtworkTag,
            attributes: ["id", "tag_name"],
          },
        ],
      });

      !response
        ? res.status(404).json({ message: "artwork not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createArtwork(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Artwork.create({
        title: req.body.title,
        year: req.body.year,
        medium: req.body.medium,
        dimensions: format_dimensions(req.body.dimensions),
        description: req.body.description,
        user_id: req.session.user_id,
      });

      // Checks if body includes an array of tags
      if (req.body.tags && req.body.tags.length) {
        const artworkTagsArr = req.body.tags.map((tag_id) => {
          return {
            artwork_id: response.id,
            tag_id,
          };
        });

        await ArtworkTag.bulkCreate(artworkTagsArr);

        // Retrives the newly created artwork by its id
        const artwork = await Artwork.findByPk(response.id, {
          include: [
            {
              model: Tag,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        });

        // Response for artwork w/ tags
        return res.json(artwork);
      }

      // Response for artwork w/o tags
      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateArtwork(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    try {
      const response = await Artwork.update(
        {
          title: req.body.title,
          year: req.body.year,
          medium: req.body.medium,
          dimensions: format_dimensions(req.body.dimensions),
          description: req.body.description,
        },
        {
          where: { id: req.params.id, user_id: req.session.user_id },
          returning: true,
        }
      );

      // Triggers when user_id & req.session.user_id mismatch
      if (response[0] === 0) {
        return res.status(404).json({ message: "artwork not found" });
      }

      await ArtworkTag.destroy({ where: { artwork_id: req.params.id } });

      // Checks if body includes an array of tags
      if (req.body.tags && req.body.tags.length) {
        const artworkTagsArr = req.body.tags.map((tag_id) => {
          return {
            artwork_id: req.params.id,
            tag_id,
          };
        });

        await ArtworkTag.bulkCreate(artworkTagsArr);
      }

      const artwork = await Artwork.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Tag,
            through: ArtworkTag,
            attribtues: ["id", "tag_name"],
          },
        ],
      });

      !response
        ? res.status(404).json({ message: "artwork not found" })
        : res.json(artwork);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteArtwork(req, res) {
    if (!req.session) {
      return res.status(401).json({ message: "must be logged in" });
    }

    // Only users can delete their own artwork
    try {
      const response = await Artwork.destroy({
        where: { id: req.params.id, user_id: req.session.user_id },
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
