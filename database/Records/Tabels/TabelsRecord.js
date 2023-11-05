const { performTransaction } = require("../performTransaction");
const { pool } = require("../../pool");

class TabelsRecord {
  constructor(obj) {
    this.id = obj.id;
    this.question = obj.question;
    this.optionA = obj.optionA;
    this.optionB = obj.optionB;
    this.optionC = obj.optionC;
    this.correctAnswer = obj.correctAnswer;
  }

  static async tableExists(tableName) {
    return performTransaction(async (connection) => {
      const checkTableExistsQuery = `
        SELECT COUNT(*) AS tableExists
        FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = ?;
      `;
      const [checkResult] = await connection.execute(checkTableExistsQuery, [
        tableName,
      ]);
      return checkResult[0].tableExists === 1;
    });
  }

  static async createTable(tableName) {
    return performTransaction(async (connection) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id varchar(36) NOT NULL PRIMARY KEY,
          question TEXT NOT NULL,
          optionA TEXT NOT NULL,
          optionB TEXT NOT NULL,
          optionC TEXT NOT NULL,
          correctAnswer CHAR(1) NOT NULL)`;
      const [result] = await connection.execute(sql);
      return result;
    });
  }

  static async deleteTable(tableName) {
    return performTransaction(async (connection) => {
      const sql = `drop table ${tableName};`;
      const [result] = await connection.execute(sql);
      return result;
    });
  }

  static async showAllTablesOfUser(user) {
    return performTransaction(async (connection) => {
      const sql = `SHOW TABLES LIKE '%${user}%';`;
      const [result] = await connection.execute(sql);
      return result.map((row) => Object.values(row)[0]);
    });
  }

  static async listFromTable(table) {
    const sql = `select id, question, optionA, optionB, optionC, correctAnswer from ${table}`;
    const [results] = await pool.execute(sql);
    return results.map((obj) => new TabelsRecord(obj));
  }
}

module.exports = {
  TabelsRecord,
};
