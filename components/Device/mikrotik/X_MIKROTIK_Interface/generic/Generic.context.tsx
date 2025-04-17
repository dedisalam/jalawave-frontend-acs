"use client";
import { emptyInterfaceGeneric } from "@/service/data/x_mikrotik_interface/generic";
import { InterfaceGeneric } from "@/types/mikrotik";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface GenericContextProps {
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  formData: InterfaceGeneric;
  setFormData: Dispatch<SetStateAction<InterfaceGeneric>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const GenericContext = createContext({} as GenericContextProps);

interface GenericProviderProps {
  children: ReactNode;
}

export const GenericProvider = ({ children }: GenericProviderProps) => {
  const [dialog, setDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [formData, setFormData] = useState<InterfaceGeneric>(
    emptyInterfaceGeneric
  );
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const value: GenericContextProps = {
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
    <GenericContext.Provider value={value}>{children}</GenericContext.Provider>
  );
};
