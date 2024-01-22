// Dependency variables
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./routes");
const sequelize = require("./config/connection");
const { version } = require("./package.json");
require("dotenv").config();

// Server variables
const app = express();
const PORT = process.env.PORT || 3005;
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// Express routes
app.use(routes);

// Terminal message
function initMessage() {
  const appName = "artist-oeuvre";
  const year = new Date().getFullYear();
  const start = "2024.01.20 Sat 10.20pm";
  const fin = "2024.01.22 Mon 04:25pm";

  console.log(`
    ·················································
    ·                                               ·
    ·             ${appName} v${version}              ·
    ·            © ${year} edwin m. escobar            ·
    ·   https://github.com/escowin/${appName}    ·
    ·                                               ·
    ·················································\n
      v${version} development time:
      start:  ${start}
      fin:    ${fin}\n`);
}

// Syncs Sequelize models to the database, then turn on the server
sequelize
  .sync({ force: false })
  .then(() => {
    initMessage();
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
