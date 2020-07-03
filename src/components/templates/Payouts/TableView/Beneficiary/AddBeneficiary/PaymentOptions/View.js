import React, {memo} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import {PAYMENT_OPTIONS} from './constants';
import {loaderHoc} from '../../../../../../common/hoc';

const View = memo(({Component, selectedOption, handlePaymentOptionChange, data, getIsSubmitting, userState, selectedTransaction, onAddBeneficiary})=>(
  <div className="payment-options w-100">
    <div className="w-100 mb-5">
      <Select placeholder='Select Payment Option' options={PAYMENT_OPTIONS} value={selectedOption} onChange={handlePaymentOptionChange}/>
    </div>
    <div className="w-100">
      <Component benifeciaries={data} getIsSubmitting={getIsSubmitting} userState={userState} selectedTransaction={selectedTransaction} onAddBeneficiary={onAddBeneficiary}/>
    </div>
  </div>
));

View.propTypes={
  Component: PropTypes.oneOfType([PropTypes.element, PropTypes.object]).isRequired,
  selectedOption: PropTypes.object.isRequired,
  handlePaymentOptionChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  getIsSubmitting: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired,
  selectedTransaction: PropTypes.object.isRequired,
  onAddBeneficiary: PropTypes.func.isRequired,
};

View.displayName='View';

export default loaderHoc(View);
