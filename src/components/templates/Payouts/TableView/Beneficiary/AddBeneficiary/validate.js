export const validatePaymentFields = (state)=>{
  const newState = JSON.parse(JSON.stringify(state));
  const obj = {state: newState, isValid: true};
  const keys = Object.keys(obj.state);
  const size = keys.length;
  for (let i=0; i<size; i++) {
    const elm = obj.state[keys[i]];
    if (state.active !== elm.activeMatchKey) {
      continue;
    }
    if (elm.require && !elm.value) {
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
  }
  return obj;
};
