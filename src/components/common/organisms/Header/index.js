import React, {memo, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

import {Img, NavDropdown} from '../../molecules';
import logo from './logo.png';

const headerStyle = {height: '60px'};
const logoStyle={width: '85px', height: '25px'};

const NAVIGATION_LIST = [
  {
    id: 1,
    title: 'Log Out',
    icon: 'fa-sign-out-alt',
  },
];

const Header = memo(({currentUser, signOut}) => {
  const history = useHistory();
  const isInitialMount = useRef(true);

  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (!currentUser.data) {
      history.push('/');
    }
  }, [currentUser.data]);

  const user = currentUser?.data?.data?.user || {};
  const {image, name} = user;
  const handleSelect = (selectedObj)=>{
    if (selectedObj.id===1) {
      signOut();
    }
  };
  return (
    <div className={`w-100 position-fixed bg-blue zi-1`} style={headerStyle}>
      <div className='px-4 full-height'>
        <div className="row full-height">
          <div className="col-md-10 offset-md-1 full-height">
            <div className="row center-y full-height">
              <div className="col-6 col-md-9 center-y">
                <div className={`d-inline-block cursor-pointer relative float-left pr-5`}>
                  <div style={logoStyle} >
                    <Img src={logo}/>
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="align-right">
                  <NavDropdown image={image} name={name} options={NAVIGATION_LIST} onSelect={handleSelect}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
},
);

Header.propTypes={
  currentUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
