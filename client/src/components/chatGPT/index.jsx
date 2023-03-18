/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import style from './style.module.css';

export default function ChatGPT({ questionId, recipientId }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  // const user = useSelector(state=>state.auth.user);
  const user = useSelector((state) => state.auth.user);
  const containerRef = useRef(null);
  useEffect(() => {
    (
      async () => {
        const response = await fetch(`http://localhost:4000/question/${questionId}/messages`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipientId }),
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      }
    )();
  }, [questionId, recipientId]);

  useEffect(() => {
    // подключение к чату
    const newSocket = io('http://localhost:4000', {
      withCredentials: true,
    });
    setSocket(newSocket);
    newSocket.emit('join', {});

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receive_message');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket && inputMessage) {
      const toId = 2;
      const message = {
        fromId: user.id, toId: recipientId, questionId, body: inputMessage,
      };

      socket.emit('send_message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage('');
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div className={style.chatWindow} ref={containerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={style.message}
            style={{
              backgroundColor: message.fromId === user.id ? 'white' : '#daf8b4',
              alignSelf: message.fromId === user.id ? 'flex-end' : 'flex-start',
            }}
          >
            {message.body}

          </div>
        ))}
      </div>
      <input
        className={style.messageInput}
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      <button className={style.messageSend} type="button" onClick={sendMessage}>Send</button>
    </div>
  );
}
