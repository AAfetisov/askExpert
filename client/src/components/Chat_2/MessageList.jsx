/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

export function MessageList({ socket }) {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    socket.onmessage((event) => {
      console.log(event);

      setMsg((prev) => ([...prev, msg]));
    });

    return () => {
    };
  }, []);

  return (
    <div>
      <div>
        <span />

        <div />
      </div>
    </div>
  );
}
