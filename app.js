require("dotenv").config();
const express = require("express");
const loginRouter = require("./routes/login");
const uploadRouter = require("./routes/upload");
const validateRouter = require("./routes/validate");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

app.use("/login", loginRouter);
app.use("/upload", uploadRouter);
app.use("/validate", validateRouter);

app.listen(4000, () => {
  console.log("Server has started running");
});
