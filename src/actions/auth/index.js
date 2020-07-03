import {AuthApi} from '../../apis';

import {VALIDATE_USER} from '../../actionTypes';
import {removeAllCookie, setCookieByUserData} from '../../utils/cookie';
import {validateRole} from '../../utils/generic';
import {showToast} from '../toast';

export const validateUserByCookie = (cookies = {}) => (dispatch, getState) => {
  const state = getState();
  if (state.currentUser.data) {
    return;
  }
  const callApi = async () => {
    try {
      const res = await AuthApi.validate(cookies);
      const res_data = await res.json();
      if (res.status !== 200) {
        dispatch({type: `${VALIDATE_USER}_failed`, payload: res_data});
      } else {
        dispatch({type: `${VALIDATE_USER}_success`, payload: res_data});
      }
    } catch (err) {
      dispatch({type: `${VALIDATE_USER}_failed`, payload: err});
    }
  };
  dispatch({type: `${VALIDATE_USER}_started`});
  return Promise.resolve(callApi());
};

export const signInSuccess = (res_data, req_data) => (dispatch) => {
  const user = res_data.data.user;
  const roles = user.roles;
  if (!validateRole(roles)) {
    const error = {
      message: `You don't have required role.`,
    };
    throw error;
  }
  dispatch({type: `${VALIDATE_USER}_success`, payload: res_data});
  setCookieByUserData(res_data);
};

export const signInFailed = (err) => (dispatch) => {
  dispatch({
    type: `${VALIDATE_USER}_failed`,
    payload: err,
  });
  dispatch(showToast(err.message, 'error'));
};

export const googleSignUp = (profile) => (dispatch, getState) => {
  const state = getState();
  if (state.currentUser.data) {
    return;
  }
  const callApi = async () => {
    try {
      const res = await AuthApi.googleSignUp(profile);
      if (res.status === 500) {
        throw res;
      }
      const res_data = await res.json();
      if (res.status !== 200) {
        throw res_data;
      } else {
        dispatch(signInSuccess(res_data, profile));
      }
    } catch (err) {
      dispatch(signInFailed(err));
    }
  };
  dispatch({type: `${VALIDATE_USER}_started`});
  return Promise.resolve(callApi());
};

// export const awignSignIn = (data) => async (dispatch, getState) =>{
//   const state = getState();
//   if (state.currentUser.data) {
//     return;
//   }
//   const callApi = async () => {
//     try {
//       const res = await AuthApi.awignSignIn(data);
//       if (res.status === 500) {
//         throw res;
//       }
//       const res_data = await res.json();
//       if (res.status !== 200) {
//         throw res_data;
//       } else {
//         dispatch(signInSuccess(res_data, data.user));
//       }
//     } catch (err) {
//       dispatch({
//         type: `${VALIDATE_USER}_failed`,
//         payload: err,
//       });
//     }
//   };
//   dispatch({type: `${HIDE_TOAST}`});
//   dispatch({type: `${VALIDATE_USER}_started`});
//   return Promise.resolve(callApi());
// };

export const setUser = () => (dispatch, getState) => {
  const state = getState();
  if (state.currentUser.data) {
    return;
  }
  let persistedCurrentUser;
  const user = localStorage.getItem('currentUser');
  if (user) {
    persistedCurrentUser = JSON.parse(user);
  }
  if (persistedCurrentUser && persistedCurrentUser.data) {
    dispatch({
      type: `${VALIDATE_USER}_success`,
      payload: persistedCurrentUser.data,
    });
  }
};

const signOutSuccess = (dispatch)=>{
  removeAllCookie();
  dispatch({type: `${VALIDATE_USER}_success`, payload: null});
  return Promise.resolve('success');
};

export const signOut = () => async (dispatch, getState) => {
  dispatch({type: `${VALIDATE_USER}_started`});
  try {
    const user = getState().currentUser.data;
    if (!user) {
      return dispatch(signOutSuccess);
    }
    const headers = {
      ...user.data.headers,
    };
    await AuthApi.signOut(headers);
    return dispatch(signOutSuccess);
  } catch (err) {
    dispatch({
      type: `${VALIDATE_USER}_failed`,
      payload: 'Something went wrong, Unable to log out.',
    });
    return Promise.reject(err);
  }
};
