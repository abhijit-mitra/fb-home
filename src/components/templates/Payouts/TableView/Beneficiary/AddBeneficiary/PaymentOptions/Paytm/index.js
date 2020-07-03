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

const Paytm = memo(({
  benifeciaries,
  userState,
  getIsSubmitting,
  showToast,
  selectedTransaction, onAddBeneficiary, paymentChannels}) => {
  const paytmBenf = useMemo(()=>getPaytmBenf(benifeciaries), [benifeciaries]);
  const paymentChannelOptions = useMemo(()=>getPaymentChannelOptions(paymentChannels), [paymentChannels]);

  // States start here
  const [selectedBenf, setSelectedBenf] = useState(null);
  const [formState, setFormState] = useState(FORM_STATE);
  const [retryState, setRetryState] = useState(PAY_STATE);
  const [selectedPaymentChannel, setSelectedPaymentChannel] = useState({});
  // States ends here

  // lifeCycle starts here
  useEffect(()=>{
    setSelectedPaymentChannel(getPaymentChannelState(paymentChannels, paytmBenf));
  }, [paytmBenf]);
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
          data={paytmBenf}
          onClick={handleClick}
          renderProps={(curElm, value)=>(
            <div className="w-100">
              <div className="row">
                <div className="col-8">
                  <div className="mb-3 font-weight-bold">
                    Paytm Number: {curElm.paytmNumber}
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
        <label className="font-weight-bold">Add New Paytm Benificiary</label>
        <form className="w-100 border p-4" onSubmit={handleSubmit}>
          <label>Mobile Number</label>
          <div className="w-100 mb-3">
            <Input
              placeholder='Enter paytm number'
              type='number'
              required
              value={formState.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
          </div>
          <label>Select Payment Channel</label>
          <div className="w-100 mb-3">
            <Select
              placeholder='Select Payment Channel'
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

Paytm.displayName = 'Paytm';

Paytm.propTypes={
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

export default connect(mapStateToProps, {showToast})(Paytm);
