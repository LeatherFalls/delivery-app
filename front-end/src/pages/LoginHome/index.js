import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import loginImage from '../../assets/images/signin.jpg';
import google from '../../assets/images/google.svg';
import facebook from '../../assets/images/facebook.svg';
import './styles.css';

export default function LoginHome() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/users')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container">
      <div className="container-login">
        <h2>Sign In</h2>
      </div>
      <img src={ loginImage } alt="Login" className="login-image" />
      <div className="login-inputs">
        <input
          type="text"
          placeholder="Enter Email Id"
          data-testid="common_login__input-email"
        />
        <input
          type="password"
          placeholder="Enter Password"
          data-testid="common_login__input-password"
        />
        <button
          type="button"
          disabled
          onClick={ () => navigate('/products') }
          data-testid="common_login__button-login"
        >
          Sign In
        </button>
        <p>
          Dont have An Account?
          <Link to="/register" data-testid="common_login__button-register"> Sign Up</Link>
        </p>
      </div>
      <div className="or-login">
        <div className="or-text">
          <hr className="line-or" />
          <span>Or</span>
          <hr className="line-or" />
        </div>
        <div className="social-login">
          <button type="button" className="google-login">
            <img src={ google } alt="Google" />
            <span>Continue with Google</span>
          </button>
          <button type="button" className="facebook-login">
            <img src={ facebook } alt="Facebook" />
            <span>Continue with Facebook</span>
          </button>
          <span
            className="error-message"
            data-testid="common_login__element-invalid-email"
          >
            Message
          </span>
        </div>
      </div>
    </div>
  );
}
