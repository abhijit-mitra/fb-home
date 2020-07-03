import {TOAST} from '../../actionTypes';

const INITIAL_STATE = {
  type: null,
  message: null,
  show: false,
  delay: null,
};

export default function toast(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOAST.SHOW_TOAST:
    return {...state, show: true, ...action.payload};
  case TOAST.HIDE_TOAST:
    return {...state, ...INITIAL_STATE};
  default:
    return state;
  }
}
