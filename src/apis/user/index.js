class UserApi {
  static getUser = (conditions)=>{
    const url = `${process.env.REACT_APP_AUTH_SERVICE}central/api/v1/users/search`;
    const reqId = new Date().getTime();
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-Id': `payouts_ui_${reqId}`,
        'X_CLIENT_ID': 'payouts_ui',
      },
      body: JSON.stringify({conditions}),
    });
  }
}

export default UserApi;
