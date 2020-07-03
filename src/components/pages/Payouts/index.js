import React, {memo, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Container} from '../../common/organisms';
import {Header} from '../../common/withRedux';
import {Payouts as PayoutsTemplate} from '../../templates';

const Payouts = memo(() => {
  const history = useHistory();
  useEffect(()=>{
    const user = localStorage.getItem('currentUser');
    if (!user) {
      history.push('/');
    }
  }, []);

  return (
    <>
      <Header/>
      <Container>
        <PayoutsTemplate/>
      </Container>
    </>
  );
});

Payouts.displayName = 'Payouts';

export default Payouts;
