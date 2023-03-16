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
