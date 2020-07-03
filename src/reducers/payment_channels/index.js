import {handleActions} from 'redux-actions';

import {
  PAYMENT_CHANNELS,
} from '../../actionTypes';
import {createReducer, baseReducer} from '../utils';

const initialState = {
  ...baseReducer,
};

const paymentChannelsReducer = createReducer(PAYMENT_CHANNELS.GET_PAYMENT_CHANNELS, initialState);

const paymentChannels = handleActions(
  {
    ...paymentChannelsReducer,
  },
  initialState,
);

export default paymentChannels;
