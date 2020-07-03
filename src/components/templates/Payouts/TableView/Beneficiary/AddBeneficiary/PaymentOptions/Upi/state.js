export const PAY_STATE={
  isFetching: false,
  error: '',
};

export const FORM_STATE={
  upi: '',
  paymentChannel: null,
  submit: {
    data: null,
    isFetching: false,
    error: '',
  },
};

export const getPaymentChannelState = (paymentChannels, benf)=>{
  return benf.reduce((acc, eachBenf)=>{
    const paymentChannelObj = (paymentChannels || []).find((elm)=>elm.id===eachBenf.paymentChannelId)||{};
    acc[eachBenf.beneId]={
      value: eachBenf.paymentChannelId,
      label: paymentChannelObj.name || paymentChannelObj.channel_type,
    };
    return acc;
  }, {});
};
