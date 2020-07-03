export const isEmpty = (n) => {
  return !(n ? (typeof n === 'object' ? (Array.isArray(n) ? !!n.length : !!Object.keys(n).length) : true) : false);
};

export const validateEmail = (email) => {
  // eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const validateForm = (state)=>{
  const newState = JSON.parse(JSON.stringify(state));
  const obj = {state: newState, isValid: true};
  const keys = Object.keys(obj.state);
  const size = keys.length;
  for (let i=0; i<size; i++) {
    const elm = obj.state[keys[i]];
    if (elm.require && (elm.value==='' || elm.value===null) ) {
      elm.error = 'Required';
      obj.isValid = false;
      continue;
    }
    if (elm.type==='number') {
      if (isNaN(elm.value)) {
        elm.error = 'Should be a number';
        obj.isValid = false;
      }
      continue;
    }
    if (elm.type==='email' && !validateEmail(elm.value)) {
      elm.error = 'Invalid email';
      obj.isValid = false;
      continue;
    }
  }
  return obj;
};

export const getValidResponse = async (res)=>{
  const error={message: 'Sorry, Something went wrong'};
  if (res.status === 500) {
    throw error;
  }
  const res_data = await res.json();
  if (res.status !== 200) {
    throw res_data;
  }
  return res_data;
};

export const validateRole = (roles) => {
  if (!roles) {
    return false;
  }
  return roles.includes('int-finance');
};
