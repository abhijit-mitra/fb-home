import Cookie from 'js-cookie';

export const setCookieByUserData = async (res_data)=>{
  const headers = res_data.data.headers;
  localStorage.setItem('currentUser', JSON.stringify({
    isFetching: false,
    data: res_data,
    error: null,
    msg: null,
  }));
  Cookie.set('client', headers.client, {domain: process.env.DOMAIN});
  Cookie.set('uid', headers.uid, {domain: process.env.DOMAIN});
  Cookie.set('access-token', headers['access-token'], {domain: process.env.DOMAIN});
};

export const removeAllCookie = ()=>{
  localStorage.removeItem('currentUser');
  Cookie.remove('client');
  Cookie.remove('uid');
  Cookie.remove('access-token');
};
