"use client";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Data } from "./Auth";
import { emptyData } from "./Auth.data";

interface AuthContextProps {
  formData: Data;
  setFormData: Dispatch<SetStateAction<Data>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [formData, setFormData] = useState<Data>(emptyData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const value: AuthContextProps = {
    formData,
    setFormData,
    isLoading,
    setIsLoading,
    submitted,
    setSubmitted,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
