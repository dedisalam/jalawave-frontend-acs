"use client";
import { emptyIPAddress } from "@/service/data/ip/address";
import { IPAddress } from "@/types/mikrotik";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface AddressContextProps {
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  dialogCreate: boolean;
  setDialogCreate: Dispatch<SetStateAction<boolean>>;
  dialogCreateHeader: string;
  setDialogCreateHeader: Dispatch<SetStateAction<string>>;
  formData: IPAddress;
  setFormData: Dispatch<SetStateAction<IPAddress>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AddressContext = createContext({} as AddressContextProps);

interface AddressProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const AddressProvider = ({ children }: AddressProviderProps) => {
  const [dialog, setDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogCreateHeader, setDialogCreateHeader] = useState<string>("");
  const [formData, setFormData] = useState<IPAddress>(emptyIPAddress);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value: AddressContextProps = {
    dialog,
    dialogCreate,
    dialogCreateHeader,
    dialogHeader,
    formData,
    isLoading,
    setDialog,
    setDialogCreate,
    setDialogCreateHeader,
    setDialogHeader,
    setFormData,
    setIsLoading,
    setSubmitted,
    submitted,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};
