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

interface InterfacesContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  device: DeviceObject | undefined;
  setDevice: Dispatch<SetStateAction<DeviceObject | undefined>>;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export const InterfacesContext = createContext({} as InterfacesContextProps);

interface InterfacesProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const InterfacesProvider = ({
  children,
  params,
}: InterfacesProviderProps) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<DeviceObject>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  const value: InterfacesContextProps = {
    id,
    loading,
    setId,
    setLoading,
    device,
    setDevice,
    activeIndex,
    setActiveIndex,
  };

  return (
    <InterfacesContext.Provider value={value}>
      {children}
    </InterfacesContext.Provider>
  );
};
