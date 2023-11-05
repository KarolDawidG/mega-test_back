const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { TabelsRecord } = require("../../database/Records/Tabels/TabelsRecord");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");

router.use(middleware);

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const tablesUser = await TabelsRecord.showAllTablesOfUser(username);

    return res.json({ tablesUser });
  } catch (error) {
    logger.error(`Błąd podczas wyszukiwania tabelki: ${error.message}`);
    return res
      .status(STATUS_CODES.SERVER_ERROR)
      .send("Blad wyszukiwania tabel");
  }
});

router.post("/:username/:testName", async (req, res) => {
  const { username, testName } = req.params;
  const newTabel = username + "_" + testName;

  try {
    const tableExists = await TabelsRecord.tableExists(newTabel);
    if (tableExists) {
      return res
        .status(STATUS_CODES.SUCCESS)
        .send(`Tabela ${newTabel} już istnieje.`);
    }
    await TabelsRecord.createTable(newTabel);

    return res
      .status(STATUS_CODES.SUCCESS)
      .send("Tabela została pomyślnie utworzona.");
  } catch (error) {
    logger.error(`Błąd podczas tworzenia tabeli: ${error.message}`);
    return res.status(STATUS_CODES.SERVER_ERROR).send("Blad tworzenia tabeli");
  }
});

router.delete("/:testName", async (req, res) => {
  const { testName } = req.params;
  try {
    const tableExists = await TabelsRecord.tableExists(testName);
    if (!tableExists) {
      return res
        .status(STATUS_CODES.SUCCESS)
        .send(`Tabela: '${testName}' nie istnieje.`);
    }
    await TabelsRecord.deleteTable(testName);

    return res
      .status(STATUS_CODES.SUCCESS)
      .send("Tabela została pomyślnie skasowana.");
  } catch (error) {
    logger.error(`Błąd podczas tworzenia tabeli: ${error.message}`);
    return res.status(STATUS_CODES.SERVER_ERROR).send("Blad kasowania tabeli");
  }
});

module.exports = router;
