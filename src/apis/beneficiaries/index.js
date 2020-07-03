class BeneficiariesApi {
  static addBeneficiary = (reqBody)=>{
    const url = `${process.env.REACT_APP_PAYOUT_API_URL}v1/beneficiaries`;
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
  static getBeneficiary = (conditions)=>{
    const url = `${process.env.REACT_APP_PAYOUT_API_URL}v1/beneficiaries/search`;
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

export default BeneficiariesApi;
