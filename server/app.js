require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const socketIo = require('socket.io');
// routes
const { ChatMessage } = require('./db/models');

const authRouter = require('./routes/auth.route');
const questionRouter = require('./routes/question.route');
const profileRouter = require('./routes/profile.route');
const myQuestionRouter = require('./routes/myQuestion.route');
const signallingChannelRouter = require('./routes/signallingChannel.route');
const subscribeRouter = require('./routes/subscribe.route');
const messageApiRouter = require('./routes/message.api.router');
const allQuestionsRouter = require('./routes/allQuestions.route');

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
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400 * 100, // COOKIE'S LIFETIME — 100 DAYS
  },
};
const sessionMiddleware = session(sessionConfig);
app.use(sessionMiddleware);

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  }),
);

app.use('/auth', authRouter);
app.use('/question', questionRouter);
app.use('/profile', profileRouter);
app.use('/myquestion', myQuestionRouter);
app.use('/schannel', signallingChannelRouter);
app.use('/subscribe', subscribeRouter);
app.use('/api/message', messageApiRouter);
app.use('/allquestions', allQuestionsRouter);

const port = process.env.PORT ?? 3100;
const server = app.listen(port, () => console.log(`Sever started on http://localhost:${port}`));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

const usersOnline = new Map();
const videoUsersOnline = new Map();

io.on('connection', (socket) => {
  const { user } = socket.request.session;
  const currentUser = user?.id;

  socket.emit('me', socket.id);
  socket.on('join', () => {
    usersOnline.set(user.id, socket.id);
  });
  socket.on('join_video', () => {
    videoUsersOnline.set(user.id, socket.id);
  });

  socket.on('disconnect', () => {
    if (currentUser) {
      usersOnline.delete(currentUser);
      videoUsersOnline.delete(currentUser);
    }
    socket.broadcast.emit('callEnded'); // TODO: не забыть исправить на адресную
  });

  socket.on('send_message', async (message) => {
    socket.to(usersOnline.get(message.toId)).emit('receive_message', message);

    const {
      fromId, toId, body, questionId,
    } = message;

    ChatMessage.create({
      toId, fromId: currentUser, body, questionId,
    });
  });

  socket.on('callUser', ({
    userToCall, signalData, from, name,
  }) => {
    const recipientId = videoUsersOnline.get(userToCall);
    const senderId = videoUsersOnline.get(currentUser);
    io.to(recipientId).emit('callUser', { signal: signalData, from: senderId, name });
  });

  socket.on('answerCall', (data) => {
    console.log(8888888, 'AnsweringCall');
    io.to(data.to).emit('callAccepted', data.signal);
  });
});
