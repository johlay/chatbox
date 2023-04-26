import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

const base_url = "http://localhost:8000";

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type Context = {
  register: (user: User) => void;
};

const AuthContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * register a new user
   * @param x -
   * @returns
   */
  const register = async (userInformation: User) => {
    try {
      await axios
        .post(`${base_url}/api/user/register`, userInformation)
        .then((res: AxiosResponse) => {
          if (res.status === 201) {
            return {
              status: res.status,
              data: res.data,
            };
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, data: error.response.data };
      }
    }
  };
  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
