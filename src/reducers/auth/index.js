import {handleActions} from 'redux-actions';

import {
  VALIDATE_USER,
} from '../../actionTypes';
import {createReducer, baseReducer} from '../utils';

const initialState = {
  ...baseReducer,
};

const user = createReducer(VALIDATE_USER, initialState);

const currentUser = handleActions(
  {
    ...user,
  },
  initialState,
);

export default currentUser;
