import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Toast as ToastAtom} from '../../atoms';

const ERROR_MSG = 'Something went wrong! Try again later';


const Toast = memo((props) => <ToastAtom {...props}/>);


const mapStateToProps = ({toast}) => ({
  show: toast.show,
  type: toast.type|| 'success',
  message: toast.message || ERROR_MSG,
  delay: toast.delay || 4000,
});

Toast.displayName = 'Toast';

export default connect(
  mapStateToProps,
  null,
)(Toast);
