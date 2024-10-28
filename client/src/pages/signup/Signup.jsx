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

// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { REGISTER_USER } from '../../api/gql/queries/user';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser({
//         variables: {
//           signUpInput: {
//             name,
//             email,
//             password,
//           },
//         },
//       });
//       console.log('Registration successful:', response.data.register);
//       // Optionally handle successful registration (e.g., redirect or show a message)
//     } catch (err) {
//       console.error('Error during registration:', err);
//       // Handle errors, e.g., display them to the user
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <button type="submit" disabled={loading}>
//         {loading ? 'Registering...' : 'Register'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error.message}</p>}
//       {data && <p style={{ color: 'green' }}>Registration successful!</p>}
//     </form>
//   );
// };

// export default Signup;
