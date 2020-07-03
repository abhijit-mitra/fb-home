export const STATUS_OPTIONS = [
  {
    value: 'failed',
    label: 'Failed',
  },
  {
    value: 2,
    label: 'Attempted',
  },
];

export const INITIAL_STATE = {
  id: {
    value: '',
    error: null,
  },
  beneficiary_user_id: {
    value: '',
    error: null,
  },
  status: {
    value: {
      value: 'failed',
      label: 'Failed',
    },
    error: null,
  },
  requested_at: {
    value: '',
    error: null,
  },
  created_at: {
    value: null,
    error: null,
  },
};
