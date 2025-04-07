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

interface RebootContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  device: DeviceObject | undefined;
  setDevice: Dispatch<SetStateAction<DeviceObject | undefined>>;
}

export const RebootContext = createContext({} as RebootContextProps);

interface RebootProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const RebootProvider = ({ children, params }: RebootProviderProps) => {
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

  const value: RebootContextProps = {
    id,
    loading,
    setId,
    setLoading,
    device,
    setDevice,
  };

  return (
    <RebootContext.Provider value={value}>{children}</RebootContext.Provider>
  );
};
