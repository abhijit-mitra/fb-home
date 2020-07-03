import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import './style.css';
import {isEmpty} from '../../../../utils/generic';

let timer = null;
const ERROR_MSG = 'Something went wrong! Try again later';

const img = {
  success: <i className="fas fa-check-circle font-14 text-success"></i>,
  error: <i className="fas fa-times-circle font-14 text-danger"></i>,
};

const Toast = memo((props) => {
  const message = isEmpty(props.message) ? ERROR_MSG : props.message;
  const [show, setShow] = useState(props.show);
  useEffect(() => {
    setShow(props.show);
    if (!props.show) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setShow(false);
    }, props.delay);
  }, [props]);
  return (
    show &&
    message && (
      <div
        className={`fixed-bottom toast_v2 py-3 px-4 text-capitalize text-white
        font-14 rounded shadow`}
      >
        <div className="d-flex flex-wrap">
          <div className='pr-4 w-10'>
            {img[props.type]}
          </div>
          <div className='pr-4 w-90'>
            {message}
          </div>
        </div>
      </div>
    )
  );
});

Toast.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']),
  delay: PropTypes.number,
};

Toast.defaultProps = {
  message: ERROR_MSG,
  show: false,
  type: 'success',
  delay: 4000,
};

Toast.displayName = 'Toast';

export default Toast;
