import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {BASE_API_STATE} from './state';
import {getUser} from './apiHelper';
import View from './View';


const AddBeneficiary = memo(({getIsSubmitting, selectedTransaction}) => {
  const [userState, setUserState] = useState(BASE_API_STATE);

  useEffect(()=>{
    const setters ={setUserState};
    const getters={selectedTransaction};
    getUser(setters, getters);
  }, []);

  return (
    <div className="w-100" style={{minHeight: '200px'}}>
      <View
        getIsSubmitting={getIsSubmitting}
        selectedTransaction={selectedTransaction}
        {...userState}
      />
    </div>
  );
});

AddBeneficiary.displayName = 'AddBeneficiary';

AddBeneficiary.propTypes={
  getIsSubmitting: PropTypes.func,
  selectedTransaction: PropTypes.object,
};
AddBeneficiary.defaultProps={
  getIsSubmitting: ()=>{},
  selectedTransaction: {},
};

export default AddBeneficiary;
