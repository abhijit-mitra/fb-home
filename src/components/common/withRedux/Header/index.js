import React, {memo} from 'react';
import {connect} from 'react-redux';

import {Header as HeaderOrganism} from '../../organisms';
import {signOut} from '../../../../actions/';

const Header = memo((props) => (
  <HeaderOrganism {...props}/>
));

const mapStateToProps = ({currentUser})=>({
  currentUser,
});

Header.displayName = 'Header';

export default connect(mapStateToProps, {signOut})(Header);
