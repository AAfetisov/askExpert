import ATypes from '../types';

const initialState = {
  user: {},
};
export const profileReducers = (state = initialState, action) => {
  switch (action.type) {
    case ATypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ATypes.REFRESH_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ATypes.UPDATE_USER_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    case ATypes.UPDATE_USER_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    case ATypes.UPDATE_USER_SURNAME:
      return {
        ...state,
        user: {
          ...state.user,
          surname: action.payload,
        },
      };
    case ATypes.UPDATE_USER_BIO:
      return {
        ...state,
        user: {
          ...state.user,
          bio: action.payload,
        },
      };
    case ATypes.PROFILE_LOGOUT:
      return {
        ...state, user: {},
      };

    default:
      return state;
  }
};
