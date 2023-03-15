import ATypes from '../types';

// export const setAuthAC = (isAuth)=>({type:ATypes.AUTH_SET,payload: {isAuth}});
export const setUserAC = (user) => ({ type: ATypes.USER_SET, payload: { user } });
export const refreshSEssionAC = (user) => ({ type: ATypes.AUTH_REFRESH, payload: { user } });
export const logoutAC = () => ({ type: ATypes.AUTH_LOGOUT, payload: {} });

export const refreshSessionTh = () => async (dispatch) => {
  const response = await fetch('http://localhost:4002/auth', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (response.ok) {
    const result = await response.json();
    const user = { id: result.id, name: result.email };
    dispatch(refreshSEssionAC(user));
  }
};

export const endUserSessionTh = (callback) => async (dispatch) => {
  // callback это navigate
  const response = await fetch('http://localhost:4000/auth/signout', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (response.ok) {
    dispatch(logoutAC());
    if (typeof callback === 'function') {
      callback('/');
    }
  }
};
