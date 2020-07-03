import {TOAST} from '../../actionTypes';

export const hideToast = () => {
  return (dispatch) => {
    dispatch({type: TOAST.HIDE_TOAST});
  };
};

export const showToast = (message, type = 'success', delay = 4000) => {
  return (dispatch) => {
    dispatch(hideToast());
    dispatch({type: TOAST.SHOW_TOAST, payload: {message: message, type: type, delay: delay}});
  };
};
