import React, {memo} from 'react';
import PropTypes from 'prop-types';

import AddBeneficiary from './AddBeneficiary';

const Beneficiary = memo(({getIsSubmitting, selectedTransaction}) => {
  return (
    <div className="row">
      <div className="col-12">
        <AddBeneficiary getIsSubmitting={getIsSubmitting} selectedTransaction={selectedTransaction}/>
      </div>
    </div>
  );
});

Beneficiary.propTypes={
  getIsSubmitting: PropTypes.func,
  selectedTransaction: PropTypes.object,
};
Beneficiary.defaultProps={
  getIsSubmitting: ()=>{},
  selectedTransaction: {},
};

Beneficiary.displayName = 'Beneficiary';

export default Beneficiary;
