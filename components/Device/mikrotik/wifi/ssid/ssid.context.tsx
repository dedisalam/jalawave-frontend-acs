"use client";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Data } from "./ssid";
import { emptyData } from "./ssid.data";

interface SSIDContextProps {
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  formData: Data;
  setFormData: Dispatch<SetStateAction<Data>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const SSIDContext = createContext({} as SSIDContextProps);

interface SSIDProviderProps {
  children: ReactNode;
}

export const SSIDProvider = ({ children }: SSIDProviderProps) => {
  const [dialog, setDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [formData, setFormData] = useState<Data>(emptyData);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value: SSIDContextProps = {
    formData,
    dialog,
    dialogHeader,
    setFormData,
    setDialog,
    setDialogHeader,
    setSubmitted,
    submitted,
    isLoading,
    setIsLoading,
  };

  return <SSIDContext.Provider value={value}>{children}</SSIDContext.Provider>;
};
