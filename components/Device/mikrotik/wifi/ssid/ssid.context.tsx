"use client";
import { emptyWiFiSSID } from "@/components/Device/mikrotik/wifi/ssid/ssid.data";
import { WiFiSSID } from "@/types/mikrotik";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SSIDContextProps {
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  formData: WiFiSSID;
  setFormData: Dispatch<SetStateAction<WiFiSSID>>;
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
  const [formData, setFormData] = useState<WiFiSSID>(emptyWiFiSSID);
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
