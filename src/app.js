import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
import {Home, Payouts} from './components/pages';
import {setUser} from './actions';
import {connect} from 'react-redux';

const name = 'Abhijit';

const App = ({setUser}) => {
  useEffect(()=>{
    setUser();
  // eslint-disable-next-line
  }, []);
  return (
    <div className='w-100'>
      <Switch>
        <Route exact path="/payouts" component={Payouts} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  setUser: PropTypes.func,
};

export default connect(null, {setUser})(App);
