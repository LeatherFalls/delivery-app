import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../../services/api';
import redirectUser from '../../helper';
import loginImage from '../../assets/images/signin.jpg';
import google from '../../assets/images/google.svg';
import facebook from '../../assets/images/facebook.svg';
import './styles.css';

export default function LoginHome() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateUserExistence = async () => {
    try {
      const response = await login(email, password);
      redirectUser(response.role, navigate);
    } catch (error) {
      console.log(error);
    }
  };

  const validationButton = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const minPassword = 6;
    return ((emailRegex.test(email)) && (password.length >= minPassword));
  };

  return (
    <div className="container">
      <div className="container-login">
        <h2>Sign In</h2>
      </div>
      <img src={ loginImage } alt="Login" className="login-image" />
      <div className="login-inputs">
        <input
          type="email"
          placeholder="Enter Email Id"
          data-testid="common_login__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          placeholder="Enter Password"
          data-testid="common_login__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="button"
          data-testid="common_login__button-login"
          className="login-button"
          disabled={ !validationButton() }
          // className={ validationButton() ? 'login-button' : 'login-button-disabled' }
          onClick={ validateUserExistence }
        >
          Sign In
        </button>
        <p>
          Dont have An Account?
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
            className="register-button"
          >
            Sign Up
          </button>
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
