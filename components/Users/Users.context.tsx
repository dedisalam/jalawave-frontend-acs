"use client";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { UsersService } from "./Users.service";
import { User } from "./Users";

interface UsersContextProps {
  users: User[] | undefined;
  setUsers: Dispatch<SetStateAction<User[] | undefined>>;
}

export const UsersContext = createContext({} as UsersContextProps);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await new UsersService().findAll();
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const value: UsersContextProps = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
