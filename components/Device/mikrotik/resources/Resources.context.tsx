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

interface ResourcesContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  device: DeviceObject | undefined;
  setDevice: Dispatch<SetStateAction<DeviceObject | undefined>>;
}

export const ResourcesContext = createContext({} as ResourcesContextProps);

interface ResourcesProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const ResourcesProvider = ({
  children,
  params,
}: ResourcesProviderProps) => {
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

  const value: ResourcesContextProps = {
    id,
    loading,
    setId,
    setLoading,
    device,
    setDevice,
  };

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};
