import React, { useState } from 'react';
import { useAuth } from '../../api/hooks/useAuth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { handleRegisterUser, data, loading, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegisterUser({name, email, password});
    setEmail('');
    setPassword('');
    setName('')
  };
// console.log(name, email, password)
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && <p>Signup successful! Welcome, {data.register.email}</p>}
    </form>
  );
};

export default Signup;