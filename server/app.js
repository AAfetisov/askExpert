/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const socketIo = require('socket.io');
const stripe = require('stripe')('sk_test_51MnpLGEaS26Uz7HefFGi8dwthbR22D9EJ0Jc4bX3E262vPvpndS4t8gW3hyhVAurYQsWMgG5IfeRRQ4jCzD7PlEg00ancir1mK');
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
const payRouter = require('./routes/pay.route');
const { User } = require('./db/models');
const ratingRouter = require('./routes/rating.route');
const topExpertsRouter = require('./routes/topExperts.route');
const payOfferRouter = require('./routes/payOffer.route');
const transactionRouter = require('./routes/transaction.route');

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
app.use('/payment', payRouter);
app.use('/rating', ratingRouter);
app.use('/topexperts', topExpertsRouter);
app.use('/payoffer', payOfferRouter);
app.use('/transaction', transactionRouter);

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

const usersOnline = new Map();// юзеры чата, а не вообще все.

io.on('connection', (socket) => {
  const { user } = socket.request.session;
  const currentUser = user?.id;

  socket.emit('me', socket.id);
  console.log('+ Connected user id: ', user.id, ', socket.id: ', socket.id);

  socket.on('join', () => {
    usersOnline.set(user.id, socket.id);
  });

  socket.on('disconnect', () => {
    // video 1
    socket.broadcast.emit('callEnded');// TODO: переделать на адресное отключение
    if (currentUser) {
      usersOnline.delete(currentUser);
    }
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
  // video *
  socket.on('callUser', ({
    userToCall, signalData, from, name,
  }) => {
    io.to(usersOnline.get(userToCall)).emit('callUser', { signal: signalData, from: socket.id, name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// app.post('/api/charge', async (req, res) => {
//   try {
//     const { payment_method_id, amount } = req.body;
//     console.log(11111, payment_method_id, amount);

//     const paymentIntent = await stripe.paymentIntents.create({
//       payment_method: payment_method_id,
//       amount, // Replace with the actual amount of the payment
//       currency: 'usd', // Replace with the currency of the payment
//       description: 'Test Payment', // Replace with a description of the payment
//       confirm: true,
//     });
//     // console.log(paymentIntent);

//     res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Failed to complete payment.' });
//   }
// });
