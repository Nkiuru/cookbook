import React, { useState } from 'react';
import styles from './LoginModal.module.scss';
import PropTypes from 'prop-types';

const LoginModal = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form>
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required={true}
        />
        <input
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required={true}
        />
        <button
          type="submit"
          onClick={e => {
            e.preventDefault();
            console.log(email);
            console.log(password);
            onLogin(email, password);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

LoginModal.propTypes = {
  onLogin: PropTypes.func,
  onSignup: PropTypes.func,
};

export default LoginModal;
