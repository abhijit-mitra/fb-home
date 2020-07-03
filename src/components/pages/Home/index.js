import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import Style from './Home.module.css';
import {Img} from '../../common/molecules';
import {GAuth} from '../../templates';

const Home = (props) => {
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      props.history.push('/payouts');
    }
  }, []);
  return (
    <div className={Style.bgImage}>
      <div className={Style.logo}>
        <Img src={'https://s3.ap-south-1.amazonaws.com/awign-production/react-ui/logo-name-blue.svg'} style={{width: '80px'}} />
      </div>
      <div className="row align-items-center no-gutters">
        <div className="offset-md-2 col-md-4 offset-1 col-11">
          <div className="font-26 black">Welcome To the</div>
          <div className="font-54 black fw-900">Payment Tranfer</div>
          <div className="font-54 black fw-900">Management</div>
          <GAuth {...props} />
        </div>
        <div className="col-md-6 d-none d-md-block">
          <Img src={'https://awign-production.s3.ap-south-1.amazonaws.com/applications-ui/home_illustration.svg'} style={{width: 'auto'}} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
