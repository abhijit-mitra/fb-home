import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Style from './Login.module.css';
import {googleSignUp} from '../../../actions';
import {Loader} from '../../common/atoms';
import google from './google_icon.png';
import {Img} from '../../common/molecules';

class GAuth extends PureComponent {
  static propTypes = {
    googleSignUp: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    onLoginSuccess: PropTypes.func,
    isMobile: PropTypes.bool,
    redirectUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    history: PropTypes.object,
  };
  static defaultProps = {
    onLoginSuccess: () => {},
    redirectUrl: '/payouts',
  };
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      err: null,
      user: null,
    };
  }

  componentDidUpdate=()=>{
    const {currentUser} = this.props;
    if (currentUser.data) {
      // this.props.onLoginSuccess();
      this.handleRouting();
    }
  }

  handleRouting = () => {
    const {currentUser, history} = this.props;
    const user = currentUser.data && currentUser.data.data.user;
    if (user) {
      history.push('/payouts');
    }
  };

  handleSuccess = (e, profile) => {
    this.setState(
      {
        isSignedIn: this.googleAuth.isSignedIn.get(),
        user: {
          omniauth: {
            info: {
              email: profile.getEmail(),
              image: profile.getImageUrl(),
              name: profile.getName(),
            },
            provider: 'google',
            uid: profile.getId(),
          },
        },
      },
      () => {
        this.props.googleSignUp(this.state.user);
      },
    );
  };

  handleError = (err) => {
    this.setState({
      err: err,
    });
  };

  componentDidMount = () => {
    const user = setInterval(()=>{
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          // eslint-disable-next-line
          this.googleAuth = gapi.auth2.init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            prompt: 'select_account',
          });
          this.googleAuth
            .then(() => {
              // if (this.googleAuth.isSignedIn.get()) {
              //   const user = this.googleAuth.currentUser;
              //   const profile = user.get().getBasicProfile();
              //   this.handleSuccess(null, profile);
              // }
            })
            .catch((err) => {
              this.handleError(err);
            });
        });
        clearUser();
      }
    }, 200);
    const clearUser = () =>{
      clearInterval(user);
    };
  };

  handleLogin = (e) => {
    this.googleAuth
      .signIn()
      .then((user) => {
        const profile = this.googleAuth.currentUser.get().getBasicProfile();
        this.handleSuccess(e, profile);
      })
      .catch((err) => {
        this.handleError(err);
      });
  };

  render() {
    const {currentUser} = this.props;
    return (
      <button
        className={`${Style.button} w-50 center-x-y bg-white p-3 pointer mt-4`}
        onClick={this.handleLogin}
        disabled = {currentUser.isFetching || !window.gapi}
      >
        <div className={`${Style.icon} mr-3`}>
          <Img src={google} />
        </div>
        <div className="font-20">Google</div>
        {(currentUser.isFetching || !window.gapi) &&
          <div style={{'width': '2rem'}} className='ml-3'>
            <Loader size='sm'/>
          </div>
        }
      </button>
    );
  }
}

const mapStateToProps = ({currentUser}) => ({
  currentUser,
});
export default connect(
  mapStateToProps,
  {googleSignUp},
)(GAuth);
