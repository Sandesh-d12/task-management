import React, { useState } from 'react';
import { useAuth } from '../../api/gql/hooks/useAuth';

const Login = () => {
  const { login, loginLoading, loginError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { email, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loginLoading}>
        {loginLoading ? 'Logging in...' : 'Login'}
      </button>
      {loginError && <p>{loginError.message}</p>}
    </form>
  );
};

export default Login;
