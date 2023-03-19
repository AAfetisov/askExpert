/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';

function ScreenShare({ socket }) {
  const [stream, setStream] = useState(null);
  const [isSharingScreen, setSharingScreen] = useState(false);

  const handleShareScreen = () => {
    setSharingScreen((state) => !state);
    setStream((state) => !state);
  };

  return (
    <div>
      {stream ? (
        <button type="button" onClick={handleShareScreen}>Stop sharing</button>
      ) : (
        <button type="button" onClick={handleShareScreen}>Share screen</button>
      )}
      {!isSharingScreen && <video autoPlay />}
    </div>
  );
}

export default ScreenShare;
