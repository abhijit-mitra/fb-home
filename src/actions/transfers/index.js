import {TransfersApi} from '../../apis/';
import {TRANSFERS} from '../../actionTypes';
import {getValidResponse} from '../../utils/generic';

const ERROR_MSG = 'Sorry, Something went wrong.';

export const getTransfers = (conditions, pageNo)=> async (dispatch)=>{
  try {
    dispatch({type: `${TRANSFERS.GET_TRANSFERS}_started`});
    const res = await TransfersApi.getTransfers(conditions, pageNo);
    const res_data = await getValidResponse(res);
    dispatch({type: `${TRANSFERS.GET_TRANSFERS}_success`, payload: res_data});
  } catch (error) {
    dispatch({type: `${TRANSFERS.GET_TRANSFERS}_failed`, payload: {message: error?.message || ERROR_MSG}});
  }
};
