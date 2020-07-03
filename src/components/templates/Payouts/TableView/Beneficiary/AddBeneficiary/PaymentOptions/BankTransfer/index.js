import React, {memo, useState, useMemo, useEffect} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';

import {Input} from '../../../../../../../common/atoms';
import {Button} from '../../../../../../../common/molecules';
import {SelectCard} from '../../../../../../../common/organisms';
import {addBeneficiary, retryPayment} from '../apiHelper';
import {showToast} from '../../../../../../../../actions';
import {PAY_STATE, getPaymentChannelState, FORM_STATE} from './state';
import {getPaytmBenf, getPaymentChannelOptions, PAYMENT_MODE} from './utils';

const config={
  setValueBy: 'beneId',
};

const Bank = memo(({benifeciaries, userState, getIsSubmitting, showToast,
  selectedTransaction, onAddBeneficiary, paymentChannels}) => {
  const bankBenf = useMemo(()=>getPaytmBenf(benifeciaries), [benifeciaries]);
  const paymentChannelOptions = useMemo(()=>getPaymentChannelOptions(paymentChannels), [paymentChannels]);

  // States start here
  const [selectedBenf, setSelectedBenf] = useState(null);
  const [formState, setFormState] = useState(FORM_STATE);
  const [retryState, setRetryState] = useState(PAY_STATE);
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState({});
  // States ends here

  // lifeCycle starts here
  useEffect(()=>{
    setSelectedPaymentChannel(getPaymentChannelState(paymentChannels, bankBenf));
  }, [bankBenf]);
  // lifeCycle ends here

  const handleClick = (data)=>{
    setSelectedBenf(data);
    setRetryState((state)=>({
      ...state,
      error: '',
    }));
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    const setters={showToast, setFormState, onAddBeneficiary};
    const getters={formState, userState, getIsSubmitting, selectedBenf, paymentMode: PAYMENT_MODE};
    addBeneficiary(setters, getters);
  };

  const handleChange=(key)=>(e)=>{
    let value;
    if (key==='paymentChannel') {
      value = e;
    } else {
      value = e.target.value;
    }
    setFormState((state)=>({
      ...state,
      [key]: value,
    }));
  };

  const handlePaymentChannel = (beneId)=>(value)=>{
    setSelectedPaymentChannel((state)=>({
      ...state,
      [beneId]: value,
    }));
  };

  const handleRetryClick=()=>{
    const setters={setRetryState, showToast};
    const getters={getIsSubmitting, selectedBenf, selectedTransaction, selectedPaymentChannel};
    retryPayment(setters, getters);
  };
  return (
    <>
      <div className="mb-5">
        <SelectCard
          config={config}
          data={bankBenf}
          onClick={handleClick}
          renderProps={(curElm, value)=>(
            <div className="w-100">
              <div className="row">
                <div className="col-8">
                  <div className="w-100 mb-2 font-weight-bold">
                      Account Number: {curElm.bankAccount}
                  </div>
                  <div className="w-100 mb-2 font-weight-bold">
                      Bank Name: {curElm.bankName}
                  </div>
                  <div className="w-100 mb-3 font-weight-bold">
                      IFSC: {curElm.ifsc}
                  </div>
                  <div className="w-100">
                    <label>Select Payment Channel</label>
                    <Select placeholder='Select Payment Channel'
                      options={paymentChannelOptions}
                      value={selectedPaymentChannel[curElm.beneId]}
                      onChange={handlePaymentChannel(curElm.beneId)}
                    />
                  </div>
                </div>
                {
                  curElm.beneId===value &&
                  <div className="col-4">
                    <Button
                      label='Pay'
                      type='success'
                      loaderType='light'
                      showLoader={retryState.isFetching}
                      onClick={handleRetryClick}
                    />
                  </div>
                }
              </div>
              { curElm.beneId===value &&
                <div className="w-100 text-danger">
                  {retryState.error}
                </div>
              }

            </div>
          )}
        />
      </div>
      <div className="mb-5">
        <label className="font-weight-bold">Add New Bank Account Beneficiary</label>
        <form className="w-100 border p-4" onSubmit={handleSubmit}>
          <label>Account Number</label>
          <div className="w-100 mb-3">
            <Input
              placeholder='Enter Account Number'
              required
              value={formState.bankAccount}
              onChange={handleChange('bankAccount')}
            />
          </div>
          <label>Bank Name</label>
          <div className="w-100 mb-3">
            <Input
              placeholder='Enter Bank Name'
              required
              value={formState.bankName}
              onChange={handleChange('bankName')}
            />
          </div>
          <label>IFSC</label>
          <div className="w-100 mb-3">
            <Input
              placeholder='Enter  IFSC'
              required
              value={formState.ifsc}
              onChange={handleChange('ifsc')}
            />
          </div>
          <label>Select Payment Channel</label>
          <div className="w-100 mb-3">
            <Select placeholder='Select Payment Channel'
              options={paymentChannelOptions}
              value={formState.paymentChannel}
              onChange={handleChange('paymentChannel')}
              required
            />
          </div>
          <Button
            label='Save'
            type='success'
            loaderType='light'
            actionType='submit'
            showLoader={formState.submit.isFetching}
          />
          <div className="text-danger">{formState.submit.error}</div>
        </form>
      </div>
    </>
  );
});

Bank.displayName = 'Bank';


Bank.propTypes={
  getIsSubmitting: PropTypes.func.isRequired,
  benifeciaries: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  showToast: PropTypes.func.isRequired,
  selectedTransaction: PropTypes.object.isRequired,
  onAddBeneficiary: PropTypes.func.isRequired,
  paymentChannels: PropTypes.array.isRequired,
};

const mapStateToProps=({paymentChannels: {data}})=>({
  paymentChannels: data?.data?.payment_channels || [],
});

export default connect(mapStateToProps, {showToast})(Bank);
