const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST || 'localhost', // You can add a DB_HOST environment variable if needed
    port: process.env.DB_PORT || 5432, // Change the port if your PostgreSQL server is running on a different port
    dialect: 'postgres'
  }
);

module.exports = sequelize;