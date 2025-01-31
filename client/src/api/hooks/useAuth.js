import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USERS, LOGIN_USER, REGISTER_USER } from "../gql/queries/user";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/authSlice";
import { toast } from "react-hot-toast";
import { setUsers } from "../../redux/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
        const token = data?.login?.token;
        dispatch(setToken(token));
        dispatch(setUser(data?.login));
        navigate("/create-project");
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
      toast.error(err.message);
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

export const useGetUsers = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  const dispatch = useDispatch();

const users = data ?  data?.getAll : null;
  dispatch(setUsers(users));
  return { users, loading, error };
};