const express = require("express");
const router = express.Router();
const axios = require("axios");
const MESSAGES = require("../../config/messages");
const URL = require("../../config/url");
const middleware = require("../../config/middleware");

const { REACT_APP_SECRET_KEY } = require("../../config/configENV");

router.use(middleware);

router.post("/", async (req, res) => {
  const { token, inputVal } = req.body;

  try {
    const response = await axios.post(
      `${URL.RECAPTCHA}${REACT_APP_SECRET_KEY}&response=${token}`,
    );
    if (response.data.success) {
      return res.send("Human 👨 👩");
    } else {
      return res.status(403).send("Robot 🤖");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(MESSAGES.CAPTCHA_ERROR);
  }
});

module.exports = router;
