import React, {useState, useMemo, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';

import {Table, Modal} from '../../../common/organisms';
import {Loader} from '../../../common/atoms';
import {Button} from '../../../common/molecules';
import Beneficiary from './Beneficiary';
import {COLUMNS} from './constants';

let TableInstance = null;

const TableView = forwardRef(({getTransfers, transfers, filterState}, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  useImperativeHandle(ref, () => ({
    resetPagination() {
      if (TableInstance) {
        TableInstance.state.page = 0;
      }
    },

  }));

  const handleModalClick=()=>{
    if (disableModal) {
      return;
    }
    setShowModal(false);
  };

  const handleRetryClick = (obj)=>()=>{
    setShowModal(true);
    setSelectedTransaction(obj);
  };

  const isSubmitting = (status)=>{
    setDisableModal(status);
  };

  const getData = ()=>{
    const data = transfers.data?.data?.transfers || [];
    const size = data.length;
    const arr = [];
    for (let i=0; i<size; i++) {
      const obj = data[i];
      obj.action = <Button label='Retry' onClick={handleRetryClick(obj)} type='success' />;
      arr.push(obj);
    }
    return arr;
  };

  const getTransfersByConditions = (state, instance)=>{
    const conditions=[{}];
    if (filterState.status.value) {
      conditions[0].status={
        operator: 'eq',
        value: filterState.status.value.value,
      };
    }
    if (filterState.id.value) {
      conditions[0].id={
        operator: 'eq',
        value: filterState.id.value,
      };
    }
    if (filterState.beneficiary_user_id.value) {
      conditions[0].beneficiary_user_id={
        operator: 'eq',
        value: filterState.beneficiary_user_id.value,
      };
    }
    if (filterState.created_at.value) {
      conditions[0].created_at={
        operator: 'eq',
        value: filterState.created_at.value.format('YYYY-MM-DD'),
      };
    }
    TableInstance=instance;
    getTransfers(conditions, state.page+1);
  };

  return (
    <>
      <div className="col-12 p-0">
        <Table
          data={useMemo(getData, [transfers.data])}
          pages={100}
          columns={COLUMNS}
          defaultPageSize = {10}
          loading={transfers.isFetching}
          loadingText={<Loader/>}
          showPageSizeOptions={false}
          noDataText='No Results Found'
          manual
          onFetchData={getTransfersByConditions}
        />
      </div>
      {showModal && <Modal onClick={handleModalClick}><Beneficiary getIsSubmitting={isSubmitting} selectedTransaction={selectedTransaction}/></Modal>}
    </>
  );
});

TableView.propTypes={
  getTransfers: PropTypes.func.isRequired,
  transfers: PropTypes.object.isRequired,
  filterState: PropTypes.object.isRequired,
};

export default TableView;
