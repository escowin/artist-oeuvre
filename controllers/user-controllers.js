const { User } = require("../models");

const userController = {
  // CRUD operators
  // - GET methods
  async getAllUsers(req, res) {
    try {
      const response = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      !response
        ? res.status(404).json({ message: "user not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getUserById({ params }, res) {
    try {
      const response = await User.findOne({
        attributes: { exclude: ["password"] },
        where: { id: params.id },
      });

      !response
        ? res.status(404).json({ message: "user not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // - POST method
  async createUser({ body }, res) {
    try {
      const response = await User.create({
        username: body.username,
        password: body.password,
      });

      res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // - PUT method
  async updateUser(req, res) {
    try {
      const response = await User.update(req.body, {
        individualHooks: true,
        where: { id: req.params.id },
      });

      !response
        ? res.status(404).json({ message: "user not found" })
        : res.json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // - DELETE method
  async deleteUser({ params }, res) {
    try {
      const response = await User.destroy({
        where: { id: params.id },
      });

      !response
        ? res.status(404).json({ message: "user not found" })
        : res.json({ message: "user successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Creates login session so users can perform authguarded CRUD operations
  async login(req, res) {
    try {
      // Attempts to locate user within the database by the provided username
      const response = await User.findOne({
        where: { username: req.body.username },
      });
      if (!response) {
        res.status(400).json({ message: "user not found" });
        return;
      }

      // Validates the provided password by comparing it with the stored hashed password
      const validPassword = response.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "incorrect password" });
        return;
      }

      // Successful authentication accesses the session information
      req.session.save(() => {
        req.session.user_id = response.id;
        req.session.username = response.username;
        req.session.loggedIn = true;

        // Responds with the user details & login message
        res.json({ user: response, message: "you are now logged in" });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Terminates login session
  logout(req, res) {
    try {
      req.session.loggedIn
        ? req.session.destroy(() => res.status(204).end())
        : res.status(404).end();
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error: " + err });
    }
  },
};

module.exports = userController;
