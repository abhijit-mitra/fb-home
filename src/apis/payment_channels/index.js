class PaymentChannelsApi {
  static getPaymentChannels = (conditions)=>{
    const url = `${process.env.REACT_APP_PAYOUT_API_URL}v1/payment_channels/search`;
    const reqId = new Date().getTime();
    const reqBody={
      conditions,
    };
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': `payouts_ui_${reqId}`,
        'X_CLIENT_ID': 'payouts_ui',
      },
      body: JSON.stringify(reqBody),
    });
  }
}

export default PaymentChannelsApi;
