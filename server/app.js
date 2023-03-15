require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const morgan = require("morgan");
//routes
const authRouter = require("./routes/auth.route.js");
const questionRouter = require("./routes/question.route.js");
const profileRouter = require("./routes/profile.route.js");
const myQuestionRouter = require("./routes/myQuestion.route.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/")));
app.use(morgan("dev"));

const sessionConfig = {
  name: "exp",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({}),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
  },
};
app.use(session(sessionConfig));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    // origin: '*',
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/question", questionRouter);
app.use("/profile", profileRouter);
app.use("/myquestion", myQuestionRouter);

const port = process.env.PORT ?? 3100;
app.listen(port, () =>
  console.log(`Sever started on http://localhost:${port}`)
);
