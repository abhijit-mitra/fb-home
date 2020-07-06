import React from 'react';
import './index.css';
import Profile from './profile.jpeg';
const data = ['Abhi', 'Ashik', 'Abhijit', 'Arya'];

const Card = ({img, title}) => (
  <div className='mr-3' style={{width: '160px'}}>
    <div className='w-100' style={{height: '160px'}}>
      <img className='w-100 h-100' src={img} />
    </div>
    <div className='w-100 bg-white font-12 p-3 center-x-y'>{title}</div>
  </div>
);

const AddAccount = (props) => (
  <div className='' style={{width: '160px'}}>
    <div className='w-100 center-x-y bg-light-gray' style={{height: '160px'}}>
      <i className="fas fa-plus-circle theme-color font-44"></i>
    </div>
    <div className='w-100 bg-white font-12 p-3 center-x-y'>Add Account</div>
  </div>
);

const Login = () => (
  <div className="container-fluid bg-gray vh-100">
    <div className="row">
      <div className="col-10 offset-1">
        <div className="row">
          <div className="col-6">
            <img className="w-auto fb-logo" src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
            <div className='w-100 recent-logins'>Recent logins</div>
            <div className='w-100 fb2 '> Click your picture or add an account.</div>
            <div className='row'>
              <Card img={Profile} title='Ashik' />
              <AddAccount />
            </div>
          </div>
          <div className=''></div>
          <div className="col-6">
            <div className="row">
              {data.map((elm, a) => (
                <div
                  className="col-5 border p-4 m-4 name d-flex justify-content-center"
                  key={a}
                >
                  {elm}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div >
);

export default Login;
