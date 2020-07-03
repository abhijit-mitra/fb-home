import {handleActions} from 'redux-actions';

import {
  TRANSFERS,
} from '../../actionTypes';
import {createReducer, baseReducer} from '../utils';

const initialState = {
  ...baseReducer,
};

const transfersReducer = createReducer(TRANSFERS.GET_TRANSFERS, initialState);

const transfers = handleActions(
  {
    ...transfersReducer,
  },
  initialState,
);

export default transfers;
