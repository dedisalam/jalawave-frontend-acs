"use client";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject } from "@/types/genieacs";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface DevicesContextProps {
  devices: DeviceObject[] | undefined;
  setDevices: Dispatch<SetStateAction<DeviceObject[] | undefined>>;
}

export const DevicesContext = createContext({} as DevicesContextProps);

interface DevicesProviderProps {
  children: ReactNode;
}

export const DevicesProvider = ({ children }: DevicesProviderProps) => {
  const [devices, setDevices] = useState<DeviceObject[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DeviceService.findAll();
        if (response.status === 200) {
          setDevices(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const value: DevicesContextProps = {
    devices,
    setDevices,
  };

  return (
    <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>
  );
};
