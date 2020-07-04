import React from 'react';
import './index.css';
const data = ['Abhi', 'Ashik', 'Abhijit', 'Aryan'];

const Login = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-10 offset-1">
        <div className="row">
          <div className="col-6">
            <div className="fb m-4 border p-5 d-flex justify-content-center ">
              <b>Facebook</b>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              {data.map((elm, a) => (
                <div
                  className="col-4 border p-4 m-4 name d-flex justify-content-center"
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
  </div>
);

export default Login;
