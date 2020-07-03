import moment from 'moment';

import {getValidResponse} from '../../../../../../../utils/generic';
import {BeneficiariesApi, TransfersApi} from '../../../../../../../apis';

const getAddBeneficiaryPayload = (formState, userState, paymentMode, selectedBenf)=>{
  const user = userState?.data.users?.[0] ||{};
  const obj = {
    name: user.name,
    email: user.email,
    phone: user.mobile_number,
    address1: 'Test',
    userId: user.id,
    paymentChannelId: formState.paymentChannel?.value,
  };
  obj.paymentMode=paymentMode;
  if (paymentMode === 'paytm') {
    obj.paytmNumber = formState.phoneNumber;
  } else if (paymentMode === 'banktransfer') {
    obj.bankAccount= formState.bankAccount;
    obj.bankName=formState.bankName;
    obj.ifsc= formState.ifsc;
  } else {
    obj.vpa= formState.upi;
  }
  return obj;
};


export const getBeneficiary = async (setters, getters)=>{
  const {setBeneficiaryState} = setters;
  const {selectedTransaction} = getters;
  const userId = selectedTransaction.beneficiary_user_id;
  const conditions = [
    {userId: {
      operator: 'eq',
      value: userId,
    },
    }];
  try {
    setBeneficiaryState((state)=>({
      ...state,
      isFetching: true,
    }));
    const res = await BeneficiariesApi.getBeneficiary(conditions);
    const res_json = await getValidResponse(res);
    setBeneficiaryState((state)=>({
      ...state,
      isFetching: false,
      data: res_json,
      error: null,
    }));
  } catch (error) {
    setBeneficiaryState((state)=>({
      ...state,
      isFetching: false,
      data: null,
      error: {
        message: error?.message || 'Something Went Wrong',
      },
    }));
  }
};

export const addBeneficiary = async (setters, getters)=>{
  const {setFormState, showToast, onAddBeneficiary} = setters;
  const {formState, userState, getIsSubmitting, paymentMode, selectedBenf} = getters;
  getIsSubmitting(true);
  const payload = getAddBeneficiaryPayload(formState, userState, paymentMode, selectedBenf);
  try {
    setFormState((state)=>({
      ...state,
      submit: {
        isFetching: true,
        error: null,
      },
    }));
    const res = await BeneficiariesApi.addBeneficiary(payload);
    const res_json = await getValidResponse(res);
    setFormState((state)=>({
      ...state,
      phoneNumber: '',
      upi: '',
      bankAccount: '',
      bankName: '',
      ifsc: '',
      submit: {
        isFetching: false,
        error: null,
      },
    }));
    const data = res_json.data.beneficiary;
    onAddBeneficiary(data);
    showToast(res_json?.message || 'Beneficiary added successfully');
    getIsSubmitting(false);
  } catch (error) {
    setFormState((state)=>({
      ...state,
      submit: {
        isFetching: false,
        error: error?.message || 'Sorry Something Went Wrong',
      },
    }));
    getIsSubmitting(false);
  }
};

export const retryPayment = async (setters, getters)=>{
  const {setRetryState, showToast} = setters;
  const {selectedBenf, getIsSubmitting, selectedTransaction, selectedPaymentChannel}=getters;
  const payload = {
    'beneficiary_id': selectedBenf.beneId,
    'requester_id': selectedTransaction.requester_id,
    'requested_at': moment().format('YYYY-MM-DD HH:MM:SS'),
    'payment_channel_id': selectedPaymentChannel[selectedBenf.beneId].value,
  };
  getIsSubmitting(true);
  try {
    setRetryState((state)=>({
      ...state,
      isFetching: true,
      error: null,
    }));
    const res = await TransfersApi.retry(selectedTransaction.id, payload);
    const res_json = await getValidResponse(res);
    setRetryState((state)=>({
      ...state,
      isFetching: false,
      error: null,
    }));
    showToast(res_json?.message || 'Payment done successfully');
    getIsSubmitting(false);
  } catch (error) {
    setRetryState((state)=>({
      ...state,
      isFetching: false,
      error: error?.message || 'Sorry Something Went Wrong',
    }));
    getIsSubmitting(false);
  }
};
