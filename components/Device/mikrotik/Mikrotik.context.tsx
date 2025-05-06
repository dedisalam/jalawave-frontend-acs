"use client";
import { MenuContext } from "@/components/layout/context/menucontext";
import { DeviceService } from "@/service/DeviceService";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface MikrotikContextProps {
  id: string | undefined;
  setId: Dispatch<SetStateAction<string | undefined>>;
  device: DeviceObjectMikrotik | undefined;
  setDevice: Dispatch<SetStateAction<DeviceObjectMikrotik | undefined>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const MikrotikContext = createContext({} as MikrotikContextProps);

interface MikrotikProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const MikrotikProvider = ({
  children,
  params,
}: MikrotikProviderProps) => {
  const { activeListMenu, setActiveListMenu } = useContext(MenuContext);

  const [id, setId] = useState<string>();
  const [device, setDevice] = useState<DeviceObjectMikrotik>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const param = await params;
        setId(param.id);
        if (id !== undefined) {
          const response = await DeviceService.findById(id);
          if (response.status === 200) {
            setDevice(response.data[0] as DeviceObjectMikrotik);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    setRefresh(false);
  }, [id, params, refresh]);

  useEffect(() => {
    if (device !== undefined) {
      const identity =
        device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value;
      const menu = activeListMenu.find((item) => item.label === identity);

      if (menu === undefined) {
        setActiveListMenu([
          activeListMenu[0],
          new Mikrotik(device).getMenuItem(),
          activeListMenu[1],
        ]);
      }
    }
  }, [activeListMenu, device, setActiveListMenu]);

  const value: MikrotikContextProps = {
    id,
    device,
    setDevice,
    setId,
    refresh,
    setRefresh,
  };

  return (
    <MikrotikContext.Provider value={value}>
      {children}
    </MikrotikContext.Provider>
  );
};
