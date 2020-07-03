class TransfersApi {
  static getTransfers = (conditions, page=1)=>{
    const url = `${process.env.REACT_APP_PAYOUT_API_URL}v1/transfers/search`;
    const reqId = new Date().getTime();
    const reqBody={
      conditions,
      page,
      'limit': 10,
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
  static retry = (transferId, reqBody)=>{
    const url = `${process.env.REACT_APP_PAYOUT_API_URL}v1/transfers/${transferId}/retry`;
    const reqId = new Date().getTime();
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

export default TransfersApi;
