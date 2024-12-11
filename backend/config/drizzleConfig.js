require('dotenv').config();
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");

// initialize connection pool
const pool = new Pool({
    connectionString: process.env.DRIZZLE_DB_URL,
});

const db = drizzle(pool);

module.exports = { db };
