import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import signUpImage from '../../assets/images/signup.jpg';
import './styles.css';

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/register')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="container">
      <div className="content">
        <Link to="/login" className="back-to-login">
          {'<'}
        </Link>
        <div className="container-signup">
          <h2>Sign Up</h2>
        </div>
      </div>
      <img src={ signUpImage } alt="Sign Up" className="login-image" />
      <div className="login-inputs">
        <input
          type="text"
          placeholder="Name"
          data-testid="common_register__input-name"
        />
        <input
          type="email"
          placeholder="Enter Email Id"
          data-testid="common_register__input-email"
        />
        <input
          type="password"
          placeholder="Enter Password"
          data-testid="common_register__input-password"
        />
        <button
          type="button"
          onClick={ () => navigate('/products') }
          data-testid="common_register__button-register"
          className="login-button"
        >
          Sign Up
        </button>
        <p>
          Already have An Account?
          <button
            className="register-button"
            type="button"
            onClick={ () => navigate('/login') }
          >
            Sign in
          </button>
        </p>
        <span
          className="error-message"
          data-testid="common_register__element-invalid_register"
        >
          Message
        </span>
      </div>
    </div>
  );
}
