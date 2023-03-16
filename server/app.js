require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
// routes
const authRouter = require('./routes/auth.route');
const questionRouter = require('./routes/question.route');
const subscribeRouter = require('./routes/subscribe.route');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));
app.use(morgan('dev'));

const sessionConfig = {
  name: 'exp',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore({}),
  cookie: { httpOnly: true },
};
app.use(session(sessionConfig));

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

app.use('/auth', authRouter);
app.use('/question', questionRouter);
app.use('/subscribe', subscribeRouter);

const port = process.env.PORT ?? 3100;
app.listen(port, () => console.log(`Sever started on http://localhost:${port}`));
