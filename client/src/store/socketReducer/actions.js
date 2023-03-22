import io from 'socket.io-client';
import ATypes from '../types';

export const setSocketOnAC = (socket) => ({
  type: ATypes.SOCKET_CONNECT,
  payload: { socket },
});

export const setSocketOffAC = (socket) => ({
  type: ATypes.SOCKET_DISCONNECT,
  payload: { socket },
});

export const mountSocketTh = () => (dispatch) => {
  const newSocket = io('http://localhost:4000', {
    withCredentials: true,
  });
  dispatch(setSocketOnAC(newSocket));
};

export const dismountSocketTh = () => (dispatch) => {
  dispatch(setSocketOffAC());
};
