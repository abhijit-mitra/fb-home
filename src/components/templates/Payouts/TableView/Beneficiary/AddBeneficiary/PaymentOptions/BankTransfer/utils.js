export const PAYMENT_MODE = 'banktransfer';

export const getPaytmBenf = (benifeciaries)=>{
  const data = benifeciaries?.data?.beneficiaries || [];
  return data.filter((elm)=>elm.paymentMode===PAYMENT_MODE);
};

export const getPaymentChannelOptions = (paymentChannels)=>{
  return (paymentChannels || []).map((elm)=>({
    value: elm.id,
    label: elm.name || elm.channel_type,
  }));
};
