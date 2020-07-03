import {getValidResponse} from '../../../../../../utils/generic';
import {UserApi} from '../../../../../../apis';

export const getUser = async (setters, getters)=>{
  const {setUserState} = setters;
  const {selectedTransaction} = getters;
  const conditions = [
    {id: {
      operator: 'eq',
      value: selectedTransaction.beneficiary_user_id,
    },
    }];
  try {
    setUserState((state)=>({
      ...state,
      isFetching: true,
    }));
    const res = await UserApi.getUser(conditions);
    const res_json = await getValidResponse(res);
    setUserState((state)=>({
      ...state,
      isFetching: false,
      data: res_json,
      error: null,
    }));
  } catch (error) {
    setUserState((state)=>({
      ...state,
      isFetching: false,
      data: null,
      error: {
        message: error?.message || 'Something Went Wrong',
      },
    }));
  }
};
