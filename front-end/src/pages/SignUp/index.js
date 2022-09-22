import React from 'react';
import { useNavigate } from 'react-router-dom';
import signUpImage from '../../assets/images/signup.jpg';
import './styles.css';

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="content">
        <h2
          className="back-to-login"
          onClick={ () => navigate('/') }
        >
          {'<'}
        </h2>
        <div className="container-signup">
          <h2>Sign Up</h2>
        </div>
      </div>
      <img src={ signUpImage } alt="Sign Up" className="login-image" />
      <div className="login-inputs">
        <input type="text" placeholder="Enter Email Id" />
        <input type="password" placeholder="Enter Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="button" onClick={ () => navigate('/products') }>Sign Up</button>
        <p>
          Already have An Account?
          <span onClick={ () => navigate('/') }> Sign In</span>
        </p>
      </div>
    </div>
  );
}
