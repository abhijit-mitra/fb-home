export const COLUMNS = [
  {
    Header: 'Transfer Id',
    accessor: 'id',
  },
  {
    Header: 'User Id',
    accessor: 'beneficiary_user_id',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Reason',
    accessor: 'status_reason',
  },
  {
    Header: 'Attempted At',
    accessor: 'requested_at',
  },
  {
    Header: 'No of Failures',
    accessor: 'number_of_failures',
  },
  {
    Header: 'Actions',
    accessor: 'action',
  },
];

export const TABLE_DATA=[{
  'id': 65353,
  'payment_channel_transfer_id': '227bfaecx2af8x48e0xb25bxd889ff82a53f',
  'requester_id': '115658',
  'beneficiary_user_id': '115658',
  'beneficiary_id': 26374,
  'payment_channel_beneficiary_id': 'ac0cb080xba70x49abx800cx3f0b2d92d794',
  'amount': 2752.875,
  'requested_amount': 2752.875,
  'status': 'failed',
  'internal_status': 'SENDING_TO_PAYMENT_CHANNEL_FAILED',
  'status_reason': 'Transfer failed due to internal reason',
  'internal_status_reason': 'Not enough available balance in the account',
  'sub_status': null,
  'remarks': 'Workforce withdrawal request on 29 May 2020 06 43 PM',
  'requested_at': '2020-05-29',
  'created_at': '2020-05-29 18:43:22',
  'updated_at': '2020-05-29 18:43:22',
  'payouts_notified': true,
  'reference_id': null,
  'utr': null,
  'processed_on': null,
  'internal_created_time': '2020-05-29 18:43:22',
  'internal_retrying_time': null,
  'creation_failed_time': null,
  'internal_processing_time': '2020-05-29 18:43:22',
  'internal_processing_failed_time': null,
  'internal_processing_success_time': '2020-05-29 18:43:22',
  'sending_to_payment_channel_time': '2020-05-29 18:43:22',
  'sending_to_payment_channel_failed_time': '2020-05-29 18:43:22',
  'payment_channel_pending_time': null,
  'payment_channel_disbursed_time': null,
  'payment_channel_disbursal_failed_time': null,
  'internal_credited_time': null,
  'beneficiary': {},
}];