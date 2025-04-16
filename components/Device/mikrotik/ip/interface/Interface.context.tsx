"use client";
import { emptyInterface } from "@/service/data/ip/interface";
import { IPInterface } from "@/types/mikrotik";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface InterfaceContextProps {
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  formData: IPInterface;
  setFormData: Dispatch<SetStateAction<IPInterface>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const InterfaceContext = createContext({} as InterfaceContextProps);

interface InterfaceProviderProps {
  children: ReactNode;
}

export const InterfaceProvider = ({ children }: InterfaceProviderProps) => {
  const [dialog, setDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [formData, setFormData] = useState<IPInterface>(emptyInterface);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value: InterfaceContextProps = {
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
    <InterfaceContext.Provider value={value}>
      {children}
    </InterfaceContext.Provider>
  );
};
