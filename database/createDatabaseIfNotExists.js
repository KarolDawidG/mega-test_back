const { pool } = require("./pool");

const createDatabaseIfNotExists = async (databaseName) => {
  try {
    const [rows] = await pool.query("SHOW DATABASES");
    const databases = rows.map((row) => row.Database);

    if (!databases.includes(databaseName)) {
      await pool.query(`CREATE DATABASE ${databaseName}`);
    }

    console.log(`Database "${databaseName}" created or already exists.`);
  } catch (err) {
    console.error(`Error creating database "${databaseName}":`, err);
  }
};

module.exports = {
  createDatabaseIfNotExists,
};
