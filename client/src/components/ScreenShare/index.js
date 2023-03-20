/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import defaultExport from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyBxsXDGCqhdlUm0sFMBXRw5urRo78y_ygY',
  authDomain: 'webrtctest-ece3a.firebaseapp.com',
  projectId: 'webrtctest-ece3a',
  storageBucket: 'webrtctest-ece3a.appspot.com',
  messagingSenderId: '1093200799026',
  appId: '1:1093200799026:web:76983f1da1604514f1a32b',
  measurementId: 'G-V0YWNT17FH',
};
const servers = {
  iceServers: [
    // { urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']}
    {
      urls: 'turn:relay.metered.ca:80',
      username: 'e3f7e3391cbbbbf5815e8ee4',
      credential: 'xveyQe+r5AcJqoNd',
    },
    {
      urls: 'turn:relay.metered.ca:443',
      username: 'e3f7e3391cbbbbf5815e8ee4',
      credential: 'xveyQe+r5AcJqoNd',
    },
  ],
  iceCandidatePoolSize: 10,
};

function ScreenShare() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isSharingScreen, setSharingScreen] = useState(false);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const pc = new RTCPeerConnection(servers);
  }, []);

  const handleShareScreen = () => {
    // setSharingScreen((state) => !state);
    setLocalStream((state) => !state);
    // setRemoteStream((state) => !state);
  };

  return (
    <div>
      {localStream ? (
        <button type="button" onClick={handleShareScreen}>Stop sharing</button>
      ) : (
        <button type="button" onClick={handleShareScreen}>Share screen</button>
      )}
      <h3>local feed</h3>
      <video id="webcamLocal" autoPlay playsine />
      {!isSharingScreen && <video autoPlay />}
    </div>
  );
}

export default ScreenShare;
