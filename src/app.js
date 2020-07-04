import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Login from './components/pages/Login';

const App = (props) => {
  return (
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
  );
};

export default App;
