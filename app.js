const express = require("express");
const app = express();
const PORT = 3001;
const { initializeDatabase } = require("./database/initializeDatabase");
const { limiter, errorHandler } = require("./config/config");
const middleware = require("./config/middleware");
const logRoute = require("./routes/userRoute/loginRoute");
const adminRoute = require("./routes/adminRoute/adminRoute");
const regRoute = require("./routes/userRoute/registerRoute");
const logoutRoute = require("./routes/userRoute/logoutRoute");
const usersRoute = require("./routes/adminRoute/usersRoute");
const resetRoute = require("./routes/userRoute/resetRoute");
const forgotRoute = require("./routes/userRoute/forgotPassRoute");
const capRoutes = require("./routes/captchaRoute/capRoute");
const contactRoutes = require("./routes/userRoute/contactFormRoute");
// quiz
const quizeRoute = require("./routes/quizeRoute/quizeRoute");

//CRUD
const createTableRoute = require("./routes/createTableRoute/createTableRoute");
const createQuestionRoute = require("./routes/questionsRoute/questionsRoute");

// import/export
const importRoute = require("./routes/importExportRoute/importRoute");
const exportRoute = require("./routes/importExportRoute/exportRoute");

const MESSAGES = require("./config/messages");
const STATUS_CODES = require("./config/status-codes");
const logger = require("./logs/logger");

app.use("/register", regRoute);
app.use("/auth", logRoute);
app.use("/admin", adminRoute);
app.use("/logout", logoutRoute);
app.use("/users", usersRoute);
app.use("/reset", resetRoute);
app.use("/forgot", forgotRoute);
app.use("/cap", capRoutes);
app.use("/quiz", quizeRoute);
app.use("/create-table", createTableRoute);
app.use("/create-question", createQuestionRoute);
app.use("/import", importRoute);
app.use("/export", exportRoute);
app.use("/contact-form", contactRoutes);

app.use(middleware);
app.use(limiter);
app.use(errorHandler);

app.get("/", (req, res) => {
  return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
});

(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
