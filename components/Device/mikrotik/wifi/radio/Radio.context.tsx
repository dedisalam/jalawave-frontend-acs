"use client";
import { emptyWiFiRadio } from "@/service/data/wifi/radio";
import { WiFiRadio } from "@/types/mikrotik";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface RadioContextProps {
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  formData: WiFiRadio;
  setFormData: Dispatch<SetStateAction<WiFiRadio>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const RadioContext = createContext({} as RadioContextProps);

interface RadioProviderProps {
  children: ReactNode;
}

export const RadioProvider = ({ children }: RadioProviderProps) => {
  const [dialog, setDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [formData, setFormData] = useState<WiFiRadio>(emptyWiFiRadio);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value: RadioContextProps = {
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

  return (
    <RadioContext.Provider value={value}>{children}</RadioContext.Provider>
  );
};
