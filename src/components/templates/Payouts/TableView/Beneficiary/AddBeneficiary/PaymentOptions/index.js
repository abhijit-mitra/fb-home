import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Paytm from './Paytm';
import Upi from './Upi';
import BankTransfer from './BankTransfer';
import {BASE_API_STATE} from './state';
import {getBeneficiary} from './apiHelper';

import View from './View';

const selectMap={
  paytm: Paytm,
  upi: Upi,
  banktransfer: BankTransfer,
};

const PaymentOptions = memo(({selectedTransaction, userState, getIsSubmitting}) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'paytm',
    label: 'Paytm',
  });
  const [benifeciaries, setBeneficiaryState] = useState(BASE_API_STATE);
  useEffect(()=>{
    const setters={setBeneficiaryState};
    const getters={selectedTransaction};
    getBeneficiary(setters, getters);
  }, []);

  const handlePaymentOptionChange = (value)=>{
    setSelectedOption(value);
  };

  const handleAddBeneficiary = (benf)=>{
    setBeneficiaryState((state)=>({
      ...state,
      data: {
        ...state.data,
        data: {
          ...state.data.data,
          beneficiaries: [...state.data.data.beneficiaries, benf],
        },
      },
    }));
  };
  const Component = selectMap[selectedOption.value];
  return (
    <div className="w-100" style={{minHeight: '100px'}}>
      <View
        selectedOption={selectedOption}
        Component={Component}
        handlePaymentOptionChange={handlePaymentOptionChange}
        userState={userState}
        getIsSubmitting={getIsSubmitting}
        selectedTransaction={selectedTransaction}
        onAddBeneficiary = {handleAddBeneficiary}
        {...benifeciaries}
      />
    </div>
  );
});

PaymentOptions.propTypes={
  selectedTransaction: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  getIsSubmitting: PropTypes.func.isRequired,
};

export default PaymentOptions;
