const { Pool } = require("pg/lib");

const { USER, HOST, PASSWORD, DATABASE} = process.env;

const config = {
  user: USER,
  host: HOST,
  password: PASSWORD,
  database: DATABASE
};

const pool = new Pool(config);

pool.connect();

module.exports = {pool};