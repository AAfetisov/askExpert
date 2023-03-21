/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable jsx-a11y/media-has-caption */

import React, {
  useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
import { io } from 'socket.io-client';
import style from './style.module.css';

// const socket = io(window.location.href);
const socket = io('http://localhost:4000', {
  withCredentials: true,
});

export default function ScreenSharing({ questionId, recipientId }) {
  console.log(1111111, 'questionId, recipientId:', questionId, recipientId);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const user = useSelector((state) => state.auth.user);
  // const [idToCall, setIdToCall] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  useEffect(() => {
    socket.emit('join_video', {});
    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({
        isReceivingCall: true, from, name: callerName, signal,
      });
      answerCall();
    });
  }, []);

  // useEffect(() => {
  //   if (stream && myVideo.current) {
  //     myVideo.current.srcObject = stream;
  //   }
  // }, [stream, myVideo.current]);

  const callUser = async (id) => {
    const currStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    // .then((currentStream) => {
    //   setStream(currentStream);
    // });
    setStream(currStream);

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: user.id,
        name,
      });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <>
      <button type="button" onClick={() => callUser(recipientId)} className={style.callBtn}>
        Share Screen
      </button>
      {/* {stream && (
        <video playsInline muted ref={myVideo} autoPlay className={style.video} />
      )} */}
      {callAccepted && !callEnded && (
        <video playsInline ref={userVideo} autoPlay className={style.video} />
      )}
    </>
  );
}
