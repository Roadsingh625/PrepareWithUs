const express = require("express");
const app = express();
require("dotenv").config()
const mongoose = require("mongoose");
const cors=require('cors')
const userRoute = require("./route/user.router");
const testRoute = require("./route/test.route");
const quizRoute = require("./route/quiz.route");
const resultRoute = require("./route/result.route");
app.use(cors())
app.use(express.json());
mongoose
  .connect(
     'mongodb+srv://Admin:Admin%401234@cluster0.d71fi.mongodb.net/PrepareWithUs?retryWrites=true&w=majority',
  )
  .then((res) => {
    console.log("Connected to DB");
  });
app.use("/api/user", userRoute);
app.use("/api/test",testRoute)
app.use("/api/quiz",quizRoute)
app.use("/api/result",resultRoute)
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started...");
});
