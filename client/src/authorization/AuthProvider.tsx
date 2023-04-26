import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

const base_url = "http://localhost:8000";

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export interface AuthResponseSuccess {
  data: User;
  message: string;
  status: number;
}

export interface AuthResponseError {
  data: null;
  message: string;
  status: number;
}

type Context = {
  register: (user: User) => Promise<AuthResponseError | AuthResponseSuccess>;
};

const AuthContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * register a new user
   * @param user - input of type "User"
   * @returns an object containing information on the newly registered user.
   */
  const register = async (
    userInformation: User
  ): Promise<AuthResponseError | AuthResponseSuccess> => {
    try {
      const response = await axios.post(
        `${base_url}/api/user/register`,
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
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
