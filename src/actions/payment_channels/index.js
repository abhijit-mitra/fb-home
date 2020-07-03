import {PaymentChannelsApi} from '../../apis/';
import {PAYMENT_CHANNELS} from '../../actionTypes';
import {getValidResponse} from '../../utils/generic';

const ERROR_MSG = 'Sorry, Something went wrong.';

export const getPaymentChannels = (conditions, pageNo)=> async (dispatch)=>{
  try {
    dispatch({type: `${PAYMENT_CHANNELS.GET_PAYMENT_CHANNELS}_started`});
    const res = await PaymentChannelsApi.getPaymentChannels(conditions);
    const res_data = await getValidResponse(res);
    dispatch({type: `${PAYMENT_CHANNELS.GET_PAYMENT_CHANNELS}_success`, payload: res_data});
  } catch (error) {
    dispatch({type: `${PAYMENT_CHANNELS.GET_PAYMENT_CHANNELS}_failed`, payload: {message: error?.message || ERROR_MSG}});
  }
};
