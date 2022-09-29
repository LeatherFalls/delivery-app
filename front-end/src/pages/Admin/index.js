import React, { useContext, useState } from 'react';
import { Input, Select, Users } from '../../components/Admin/Inputs';
import globalContext from '../../context/globalContext';
import Header from '../../components/Header';
import { validateAll } from '../../helper';
import { registerByAdmin } from '../../services/api';

export default function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');

  const { renderUsers } = useContext(globalContext);

  const saveUser = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      console.log(token);
      const response = await registerByAdmin({ name, email, password, role }, token);
      console.log(response);
      renderUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="admin-container">
        <div className="register-user">
          <h2>Register User</h2>
          <div className="register-inputs">
            <Input
              labelName="name"
              labelText="Name"
              inputType="text"
              dataTestId="admin_manage__input-name"
              placeHolder="Full Name"
              inputValue={ name }
              setter={ setName }
            />
            <Input
              labelName="email"
              labelText="Email"
              inputType="email"
              dataTestId="admin_manage__input-email"
              placeHolder="youremail@site.com"
              inputValue={ email }
              setter={ setEmail }
            />
            <Input
              labelName="password"
              labelText="Password"
              inputType="password"
              dataTestId="admin_manage__input-password"
              placeHolder="Your Password"
              inputValue={ password }
              setter={ setPassword }
            />
            <Select
              value={ role }
              setter={ setRole }
            />
            <button
              type="button"
              data-testid="admin_manage__button-register"
              disabled={ !validateAll(name, email, password, role) }
              onClick={ saveUser }
            >
              Register
            </button>
            <Users />
            <h2 data-testid="admin_manage__element-invalid-register">test</h2>
          </div>
        </div>
      </div>
    </>
  );
}
