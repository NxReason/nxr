import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handlePassChange(e) {
    setPass(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div className="login-form-wrapper">
      <form className="login-form">
        <div className="login-form-field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="login-form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={pass}
            onChange={handlePassChange}
          />
        </div>

        <button className="login-form-submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
