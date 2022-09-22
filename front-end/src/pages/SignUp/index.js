import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectUser, validateName } from '../../helper';
import { register } from '../../services/api';
import signUpImage from '../../assets/images/signup.jpg';
import './styles.css';

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const registerUser = async () => {
    try {
      const response = await register(name, email, password);

      console.log(response);
      redirectUser(response.role, navigate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <button
          type="button"
          onClick={ () => navigate('/products') }
          className="back-to-login"
        >
          {'<'}
        </button>
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
          onChange={ (e) => setName(e.target.value) }
        />
        <input
          type="email"
          placeholder="Enter Email Id"
          data-testid="common_register__input-email"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          placeholder="Enter Password"
          data-testid="common_register__input-password"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          type="button"
          data-testid="common_register__button-register"
          className="login-button"
          disabled={ !validateName(name, email, password) }
          onClick={ registerUser }
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
