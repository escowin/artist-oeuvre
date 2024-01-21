// dependency variables
const express = require('express');
const sequelize = require('./config/connection');

// server variables
const app = express();
const PORT = process.env.PORT || 3005;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializes terminal message
function init() {
  const year = new Date().getFullYear();
  const start = '2024.01.20 Sat 10.20pm';

  console.log(`  begin: ${start}\n  \u00a9${year} Edwin M. Escobar`);
}

// Import your Sequelize models here if you have any

// sync sequelize models to the database, then turn on the server
sequelize
  .sync({ force: false })
  .then(() => {
    init()
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });