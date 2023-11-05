const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { limiter, errorHandler } = require("../../config/config");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");
const { TabelsRecord } = require("../../database/Records/Tabels/TabelsRecord");

router.use(errorHandler);
router.use(limiter);
router.use(middleware);

router.get("/:table", async (req, res, next) => {
  const { table } = req.params;

  try {
    const tableData = await TabelsRecord.listFromTable(table);
    return res.status(200).json({ tableData });
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

module.exports = router;
