import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Link} from 'react-router-dom';
import {Home, Payouts} from './components/pages';
import {setUser} from './actions';
import {connect} from 'react-redux';

const Home_1 = ()=>(<h1>Home</h1>);

const About = ()=>(<h1>About</h1>);

const Career = ()=>(<h1>Career</h1>);


const App = ({setUser}) => {
  useEffect(()=>{
    setUser();
  // eslint-disable-next-line
  }, []);
  return (
    <div className='container'>
        <div className='w-100 py-3 border br-10 mb-5'>
        <div className='row'>
        <div className='col-md-2 d-flex justify-content-center'>
          <Link to={'/'}>
            Home
          </Link>
        </div>
        <div className='col-md-2'>
          <Link to={'/about'}>
            About
          </Link>
        </div>
        <div className='col-md-2'>
          <Link to={'/career'}>
            Career
          </Link>
        </div>
        </div>
      </div>
      <div className='mb-5'>
        <Switch>
          <Route exact path="/" component={Home_1} />
          <Route exact path="/about" component={About} />
          <Route exact path="/career" component={Career} />
        </Switch>
      </div>
    </div>
  );
};

App.propTypes = {
  setUser: PropTypes.func,
};

export default connect(null, {setUser})(App);
