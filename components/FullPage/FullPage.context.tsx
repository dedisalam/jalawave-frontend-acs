"use client";

import { ChildContainerProps } from "@/types/types";
import { Toast } from "primereact/toast";
import React, { createContext, useRef, RefObject } from "react";

interface FullPageContextProps {
  toast: RefObject<Toast | null>;
}

export const FullPageContext = createContext({} as FullPageContextProps);

export const FullPageProvider = ({ children }: ChildContainerProps) => {
  const toast = useRef<Toast>(null);

  const value: FullPageContextProps = {
    toast,
  };

  return (
    <FullPageContext.Provider value={value}>
      {children}
    </FullPageContext.Provider>
  );
};
