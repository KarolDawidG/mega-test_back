const { pool } = require("./pool");
const { nameDB } = require("../config/configENV");
const { createDatabaseIfNotExists } = require("./createDatabaseIfNotExists");
const {
  createAccountsTable,
  createRoot,
  deleteAccount,
  eventSchedulerON,
  createQuiz,
} = require("./dbCreator");

const initializeDatabase = async () => {
  try {
    await createDatabaseIfNotExists(nameDB);

    await pool.query(`USE ${nameDB}`);
    const tables = [
      createAccountsTable,
      createRoot,
      deleteAccount,
      eventSchedulerON,
      createQuiz,
    ];
    for await (const table of tables) {
      await table(pool);
    }
    console.log("Database started correctly");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  initializeDatabase,
};
