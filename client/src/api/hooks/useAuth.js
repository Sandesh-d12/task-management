import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "../gql/queries/user";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();

  const [login, { data: userData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_USER);

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await login({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
      console.log(userData);
        const token = data?.login?.token;
        dispatch(setToken(token));
        dispatch(setUser(data?.login));
        toast.success("Successfully logged in");
    } catch (err) {
      toast.error("Login error:", err);
    }
  };
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
      console.error("Registration error:", err);
    }
  };

  return {
    handleLogin,
    handleRegisterUser,
    data,
    loginLoading,
    loginError,
    loading,
    error,
    userData,
  };
};
