import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "http://localhost:8080";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type NewUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
};

export interface AuthResponseSuccess {
  data: NewUser | User;
  message: string;
  status: number;
}

export interface AuthResponseError {
  data: null;
  message: string;
  status: number;
}

type Context = {
  isUserLoggedIn: (user: User | null) => boolean;
  login: (
    userInformation: LoginCredentials
  ) => Promise<AuthResponseError | AuthResponseSuccess>;
  logout: () => void;
  register: (
    userInformation: NewUser
  ) => Promise<AuthResponseError | AuthResponseSuccess>;
  user: User | null;
};

const AuthContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [storage, setStorage] = useLocalStorage<User | null>("user");

  useEffect(() => {
    if (!storage) {
      return;
    }

    setUser(storage);
  }, []);

  const isUserLoggedIn = (user: User | null) => Boolean(user);

  /**
   * login an user
   * @param userInformation - input of type "User"
   * @returns an object containing information on user's authentication status
   */
  const login = async (
    userInformation: LoginCredentials
  ): Promise<AuthResponseError | AuthResponseSuccess> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        userInformation
      );

      if (response.status === 200) {
        setUser(response.data.data.user);
        setStorage(response.data.data.user);
      }

      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: null,
          message: error.response.data.message,
          status: error.response.status,
        };
      } else {
        return {
          data: null,
          message: "Bad Gateway error",
          status: 502,
        };
      }
    }
  };

  /**
   * log out the user by resetting stateful values: "user", "storage"
   */
  const logout = () => {
    setUser(null);
    setStorage(null);
  };

  /**
   * register a new user
   * @param userInformation - input of type "User"
   * @returns an object containing information on the newly registered user.
   */
  const register = async (
    userInformation: NewUser
  ): Promise<AuthResponseError | AuthResponseSuccess> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        userInformation
      );

      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          data: null,
          message: error.response.data.message,
          status: error.response.status,
        };
      } else {
        return {
          data: null,
          message: "Bad Gateway error",
          status: 502,
        };
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, login, logout, register, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
