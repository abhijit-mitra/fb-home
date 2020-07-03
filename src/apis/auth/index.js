import Cookie from 'js-cookie';

export default class AuthApi {
  static validate = async (cookies) => {
    const url = `${process.env.REACT_APP_AUTH_SERVICE}central/auth/validate`;
    let client;
    let uid;
    let access_token;
    if (typeof window !== 'undefined') {
      client = Cookie.get('client', {
        path: '/',
        domain: `${process.env.REACT_APP_DOMAIN}`,
      });
      uid = Cookie.get('uid', {path: '/', domain: `${process.env.REACT_APP_DOMAIN}`});
      access_token = Cookie.get('access-token', {
        path: '/',
        domain: `${process.env.REACT_APP_DOMAIN}`,
      });
    } else {
      client = cookies.client;
      uid = cookies.uid;
      access_token = cookies['access-token'];
    }
    const reqId = new Date().getTime();
    const headers = {
      'Content-Type': 'application/json',
      'client': client,
      'uid': uid,
      'access-token': access_token,
      'X-Request-Id': `awign_ui_${reqId}`,
      'X_CLIENT_ID': 'awign_ui',
    };
    return fetch(url, {
      method: 'GET',
      headers,
    });
  };
  static googleSignUp = async (payload) => {
    const url = `${process.env.REACT_APP_AUTH_SERVICE}workforce/auth/google/sign_up`;
    const reqId = new Date().getTime();
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-Id': `awign_ui_${reqId}`,
      'X_CLIENT_ID': 'awign_ui',
    };
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
  };
  static signOut = async (header) => {
    const url = `${process.env.REACT_APP_AUTH_SERVICE}central/auth/sign_out`;
    const reqId = new Date().getTime();
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-Id': `awign_ui_${reqId}`,
      'X_CLIENT_ID': 'awign_ui',
      ...header,
    };
    return fetch(url, {
      method: 'DELETE',
      headers,
    });
  };
  static awignSignIn = async (data) =>{
    const url = `${process.env.REACT_APP_AUTH_SERVICE}central/auth/email/sign_in`;
    const reqId = new Date().getTime();
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-Id': `awign_ui_${reqId}`,
      'X_CLIENT_ID': 'awign_ui',
    };
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  }
}
