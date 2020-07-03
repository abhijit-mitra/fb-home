import React from 'react';
import PropTypes from 'prop-types';

import {Loader} from '../../atoms';
import Styles from './Button.module.css';

const Button = ({type, actionType, label, showLoader, loaderType, disabled, onClick}) => (
  <button
    type={actionType}
    className={`center-y btn btn-${type} ${(showLoader || disabled) ? 'disabled':''} font-14 ${Styles.button}`}
    onClick={onClick}>
    {label}
    {showLoader &&
      <div className='ml-3'><Loader size='sm' type={loaderType}/></div>
    }
  </button>
);

Button.propTypes={
  type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  actionType: PropTypes.oneOf(['submit', 'reset']),
  label: PropTypes.string.isRequired,
  showLoader: PropTypes.bool,
  disabled: PropTypes.bool,
  loaderType: PropTypes.oneOf(['primary', 'light']),
  onClick: PropTypes.func,
};

Button.defaultProps={
  type: 'primary',
  label: '',
  showLoader: false,
  disabled: false,
  loaderType: 'primary',
  onClick: ()=>{},
};

export default Button;
