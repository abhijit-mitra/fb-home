import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {loaderHoc} from '../../../../../common/hoc';
import PaymentOptions from './PaymentOptions';

const AddBeneficiary = memo(({
  getIsSubmitting,
  data: userState,
  selectedTransaction}) => {
  const user = userState?.data?.users?.[0] || {};
  return (
    <div className='row'>
      <div className="col-12 mb-5">
        <label className="font-weight-bold">USER DETAILS</label>
        <div className="w-100 br-10 border p-3">
          <div className="col-12 mb-3">
            <label><b>Name:</b> {user.name}</label>
          </div>
          <div className="col-12 mb-3">
            <label><b>Email:</b> {user.email}</label>
          </div>
          <div className="col-12">
            <label><b>Phone:</b> {user.mobile_number}</label>
          </div>
        </div>
      </div>
      <div className="col-12">
        <label className="font-weight-bold">Choose Beneficiary</label>
        <PaymentOptions
          getIsSubmitting={getIsSubmitting}
          selectedTransaction={selectedTransaction}
          userState={userState}
        />
      </div>
    </div>
  );
});

AddBeneficiary.propTypes={
  getIsSubmitting: PropTypes.func,
  data: PropTypes.object.isRequired,
  selectedTransaction: PropTypes.object,
};

AddBeneficiary.defaultProps={
  getIsSubmitting: ()=>{},
};

export default loaderHoc(AddBeneficiary);
