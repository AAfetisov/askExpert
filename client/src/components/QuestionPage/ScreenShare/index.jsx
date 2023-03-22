/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable jsx-a11y/media-has-caption */

import React, {
  useEffect, useRef, useState,
} from 'react';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
import style from './style.module.css';

// const socket = io(window.location.href);

function ScreenShare({ questionId, recipientId }) {
  const [imCalling, setImCalling] = useState(false);
  const [imBeingCalled, setImBeingCalled] = useState(false);
  const [callInProgress, setCallInProgress] = useState(false);

  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [idToCall, setIdToCall] = useState('');

  const socket = useSelector((state) => state.sockets.socket);
  const user = useSelector((state) => state.auth.user);

  const userVideo = useRef();
  const connectionRef = useRef();

  const leaveCall = () => {
    setImCalling(false);
    setImBeingCalled(false);
    setCallInProgress(false);
    setStream();
    setCall({});

    connectionRef?.current?.destroy();
    // window.location.reload();
  };

  useEffect(() => {
    if (!socket) { return; }
    setIdToCall(recipientId);

    socket.on('me', (id) => {
      // setMe(id);
      setMe(user.id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({
        isReceivingCall: true, from, name: callerName, signal,
      });
      setImBeingCalled(true);
    });
    return () => {
      leaveCall();
    };
  }, [socket]);

  const answerCall = () => {
    setCallInProgress(true);
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

  const callUser = async () => {
    const yourStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    setStream(yourStream);
    const peer = new Peer({ initiator: true, trickle: false, stream: yourStream });

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: recipientId,
        signalData: data,
        from: me,
        name,
      });
    });
    setImCalling(true);

    socket.on('callAccepted', (signal) => {
      setCallInProgress(true);
      peer.signal(signal);
    });

    socket.on('callEnded', (signal) => {
      leaveCall();
    });

    connectionRef.current = peer;
  };

  return (

    <div className={style.container}>
      { !imCalling && !imBeingCalled && !callInProgress
        && <button type="button" onClick={() => callUser()}>Share your screen</button>}

      {imCalling && !imBeingCalled && !callInProgress
        && <div>Waiting for user to answer</div>}

      { !imCalling && imBeingCalled && !callInProgress
        && <button type="button" onClick={answerCall}>Answer</button>}

      { !imCalling && imBeingCalled && callInProgress
      && (
      <>
        <video playsInline ref={userVideo} autoPlay className={style.video} />
        <button type="button" onClick={leaveCall}>Hang Up</button>
      </>
      )}

      { imCalling && !imBeingCalled && callInProgress
        && <button type="button" onClick={leaveCall}>Stop Sharing</button>}

    </div>
  );
}

export default ScreenShare;
