import React from 'react';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

const socket = new WebSocket('ws://localhost:4000');

export function Chat() {
  const { pathname } = window.location;
  const path = pathname.split('/');
  const chatWithUser = path[path.length - 1];

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'open', payload: { chatWithUser } }));
  };
  return (
    <div>
      <MessageList socket={socket} />
      <MessageInput socket={socket} />
    </div>
  );
}
