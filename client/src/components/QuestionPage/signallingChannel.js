/* eslint-disable no-console */
export const turnServerConfig = {
  iceServers: [
    {
      urls: 'stun:relay.metered.ca:80',
    },
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
    {
      urls: 'turn:relay.metered.ca:443?transport=tcp',
      username: 'e3f7e3391cbbbbf5815e8ee4',
      credential: 'xveyQe+r5AcJqoNd',
    },
  ],
};

export const sendSignalMessage = async (recipient, message) => {
  try {
    const response = await fetch('http://localhost:4000/schannel/send', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, recipient }),
    });
    if (response.ok) {
      console.log('OK');
    }
  } catch (err) {
    console.log(err);
  }
};

export const receiveSignalMessage = async (from) => {
  try {
    const response = await fetch('http://localhost:4000/schannel/receive', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from }),
    });
    if (response.ok) {
      const result = await response.json();
      console.log('result: ', result);
      return result;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
