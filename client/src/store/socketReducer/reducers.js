import ATypes from '../types';

const initialState = {
  socket: null,
};

export const socketReducers = (state = initialState, action) => {
  switch (action.type) {
    case ATypes.SOCKET_CONNECT:
      return {
        ...state, socket: action.payload.socket,
      };
    case ATypes.SOCKET_DISCONNECT:
      return {
        ...state, socket: null,
      };
    default:
      return state;
  }
};
