import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "../queries/user";

export const useAuth = () => {
  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOGIN_USER,
    {
      onCompleted: (data) => {
        localStorage.setItem("token", data.login.token);
      },
    }
  );

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const handleRegisterUser = async ({ name, email, password }) => {
    try {
      await registerUser({
        variables: {
          signUpInput: {
            name,
            email,
            password,
          },
        },
      });
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  // const handleRegisterUser = async () => {
  //     try {
  //       const response = await register({
  //         variables: {
  //           signUpInput: {
  //             name: "ram",                // Example name
  //             email: "a@gmail.com",       // Example email
  //             password: "abc"             // Example password
  //           }
  //         }
  //       });
  //       console.log('Registration successful:', response.data.register);
  //     } catch (err) {
  //       console.error('Error during registration:', err);
  //     }
  //   };

  return {
    // login,
    handleRegisterUser,
    data,
    // loginLoading,
    // loginError,
    loading,
    error,
  };
};
