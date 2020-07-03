import React, {memo, useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {connect} from 'react-redux';

import {AwignDateRangePicker, AwignSingleDatePicker} from '../../common/organisms';
import {Input} from '../../common/atoms';
import {Button} from '../../common/molecules';
import TableView from './TableView';

import {INITIAL_STATE, STATUS_OPTIONS} from './constants';
import {getTransfers, getPaymentChannels} from '../../../actions';

const Payouts = memo(({getTransfers, transfers, getPaymentChannels}) => {
  const [state, setState] = useState(INITIAL_STATE);
  const tableRef = useRef();

  useEffect(() => {
    getPaymentChannels([]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const conditions = [{}];
    if (state.status.value) {
      conditions[0].status = {
        operator: 'eq',
        value: state.status.value.value,
      };
    }
    if (state.id.value) {
      conditions[0].id = {
        operator: 'eq',
        value: state.id.value,
      };
    }
    if (state.beneficiary_user_id.value) {
      conditions[0].beneficiary_user_id = {
        operator: 'eq',
        value: state.beneficiary_user_id.value,
      };
    }
    if (state.created_at.value) {
      conditions[0].created_at = {
        operator: 'eq',
        value: state.created_at.value.format('YYYY-MM-DD'),
      };
    }
    getTransfers(conditions);
    tableRef.current.resetPagination();
  };
  const handleClearFilter = (e) => {
    const conditions=[{}];
    conditions[0].status = {
      operator: 'eq',
      value: 'failed',
    };
    setState(INITIAL_STATE);
    getTransfers(conditions);
    tableRef.current.resetPagination();
  };

  const handleChange = (key) => (e) => {
    let value;
    if (['id', 'beneficiary_user_id'].includes(key)) {
      value = e.target.value;
    } else {
      value = e;
    }
    setState((state) => ({
      ...state,
      [key]: {
        value: value,
        error: null,
      },
    }));
  };
  return (
    <div className="row">
      <form className="col-12 border br-5 p-5 mb-5 " onSubmit={handleSubmit} onReset={handleClearFilter}>
        <div className="row">
          <div className="col-md-4 mb-5">
            <label>Transfer Id</label>
            <Input name="id" placeholder="Enter id" type="number" onChange={handleChange('id')} value={state.id.value} />
          </div>
          <div className="col-md-4 mb-5">
            <label>User ID</label>
            <Input name="user_id" placeholder="Enter user id" type="number" onChange={handleChange('beneficiary_user_id')} value={state.beneficiary_user_id.value} />
          </div>
          <div className="col-md-4 mb-5">
            <label>Status</label>
            <Select placeholder="Select Status" options={STATUS_OPTIONS} name={'Status'} value={state.status.value} onChange={handleChange('status')} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 mb-5">
            <div className="row">
              <div className="col-8">
                <label>Created At</label>
              </div>
              <div className="col-8">
                <AwignSingleDatePicker date={state.created_at.value} onSelect={handleChange('created_at')} />
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="row">
              <div className="col-12">
                <label>Attempted At</label>
              </div>
              <div className="col-12">
                <AwignDateRangePicker
                  startDate={state.requested_at.value.startDate || null}
                  endDate={state.requested_at.value.endDate || null}
                  onSelect={handleChange('requested_at')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex">
              <div className="mr-4">
                <Button label="Clear All" type="light" actionType="reset" />
              </div>
              <Button label="Apply Filters" type="success" actionType={'submit'} />
            </div>
          </div>
        </div>
      </form>
      <TableView filterState={state} ref={tableRef} getTransfers={getTransfers} transfers={transfers} />
    </div>
  );
});

Payouts.propTypes = {
  getTransfers: PropTypes.func.isRequired,
  getPaymentChannels: PropTypes.func.isRequired,
  transfers: PropTypes.object.isRequired,
};

const mapStateToProps = ({transfers}) => ({
  transfers,
});

export default connect(mapStateToProps, {getTransfers, getPaymentChannels})(Payouts);
