const WebSocket = require('ws');

const { WebSocketServer } = WebSocket;

const { Comment } = require('../db/models');

const wss = new WebSocketServer({
  noServer: true,
  clientTracking: false,
});

const usersMap = new Map();

wss.on('connection', (ws, req) => {
  // const { user } = req.session;

  // usersMap.set(user.id, { user, ws });

  // message => {type: String, payload: Object}

  ws.on('message', (msg) => {
    const message = JSON.parse(msg);

    const { type, payload } = message;

    console.log({ message });
    // console.log(usersMap.size)

    // const sender = usersMap.get(user.id);
    const receiver = usersMap.get(+payload.chatWithUser);

    switch (type) {
      case 'message':

        Comment
          .create({
            text: payload.text,
            user_from: +payload.user_from,
            user_to: +payload.user_to,
          })
          .then((newMessage) => {
            console.log(newMessage);
            // if (sender && receiver) {
            //   sender.ws.send(JSON.stringify({ type: 'message', payload: { ...newMessage.get(), auth: true } }));
            //   receiver.ws.send(JSON.stringify({ type: 'message', payload: newMessage }));
            // } else {
            //   sender.ws.send(JSON.stringify({ type: 'message', payload: { ...newMessage.dataValues, auth: true } }));
            //   sender.ws.send(JSON.stringify({ type: 'offline', payload: { msg: 'Receiver is offline' } }));
            // }

            // sender?.ws.send(JSON.stringify({...newMessage.get(), auth:true}))
            // receiver?.ws.send(JSON.stringify(newMessage))
          })
          .catch(console.log);

        break;

      case 'open':
        sender.ws.send(JSON.stringify({ ...message, fromServer: true }));

        break;

      default:
        break;
    }
  });
});

module.exports = wss;
