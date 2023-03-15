import ATypes from '../types';

const initialState = {
  isAuth: false,
  user: {},
};
export const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case ATypes.UPDATE_USER:
      return {
        ...state, user: action.payload.user, isAuth: true,
      };
      case ATypes.REFRESH_USER:
        return {
          ...state, user: action.payload.user, isAuth: true,
        };

    default:
      return state;
  }
};
