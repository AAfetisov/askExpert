/* eslint-disable no-console */
import { useNavigate } from 'react-router-dom';
import ATypes from '../types';

export const updateUserAC = (user) => ({
  type: ATypes.UPDATE_USER,
  payload: { user },
});

export const logoutProfileAC = () => ({ type: ATypes.PROFILE_LOGOUT, payload: {} });

export const refreshUserAC = (user) => ({
  type: ATypes.REFRESH_USER,
  payload: { user },
});

export const refreshUser = (arg) => async (dispatch) => {
  const response = await fetch('http://localhost:4000/profile/form', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error(`status - ${response.status}, ${response.statusText}`);
  }

  const result = await response.json();

  const user = {
    id: result.id,
    avatar: result.userpic,
    name: result.name,
    surname: result.surname,
    email: result.email,
    bio: result.bio,
  };

  dispatch(refreshUserAC(user));
};

export const setUserName = (name) => (
  {
    type: ATypes.UPDATE_USER_NAME,
    payload: name,
  }
);

export const setUserAvatar = (avatar) => (
  {
    type: ATypes.UPDATE_USER_AVATAR,
    payload: avatar,
  }
);

export const setUserSurname = (surname) => (
  {
    type: ATypes.UPDATE_USER_SURNAME,
    payload: surname,
  }
);

export const setUserBio = (bio) => (
  {
    type: ATypes.UPDATE_USER_BIO,
    payload: bio,
  }
);

export const updateUser = (arg) => async (dispatch) => {
  const response = await fetch('http://localhost:4000/profile/form', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ user: arg }),
  });

  if (!response.ok) {
    throw new Error(`status - ${response.status}, ${response.statusText}`);
  }

  const result = await response.json()[1];

  const user = {
    id: result.id,
    avatar: result.userpic,
    name: result.name,
    surname: result.surname,
    email: result.email,
    bio: result.bio,
  };

  dispatch(updateUserAC(user));
};
