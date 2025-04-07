"use client";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject } from "@/types/genieacs";
import { Skeleton } from "primereact/skeleton";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface DeviceContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  device: DeviceObject | undefined;
  setDevice: Dispatch<SetStateAction<DeviceObject | undefined>>;
}

export const DeviceContext = createContext({} as DeviceContextProps);

interface DeviceProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const DeviceProvider = ({ children, params }: DeviceProviderProps) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<DeviceObject>();

  useEffect(() => {
    params.then((params) => {
      setId(params.id);
    });
    if (id) {
      DeviceService.getDetail(id).then((data: DeviceObject[]) => {
        setDevice(data[0]);
        setLoading(false);
      });
    }
  }, [params, id]);

  if (loading || device === undefined) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const value: DeviceContextProps = {
    id,
    loading,
    setId,
    setLoading,
    device,
    setDevice,
  };

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};
