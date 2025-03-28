"use client";

import React, { useContext, useEffect } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuContext } from "@/components/layout/context/menucontext";
import CardDeviceInfo from "@/components/molecules/card/mikrotik/CardDeviceInfo";
import CardEthernet from "@/components/molecules/card/mikrotik/CardEthernet";
import TableDeviceInfo from "@/components/molecules/table/mikrotik/TableDeviceInfo";
import TableEthernet from "@/components/molecules/table/mikrotik/TableEthernet";
import { Mikrotik } from "@/service/parser/Mikrotik";

interface MikrotikPageProps {
  device: DeviceObjectMikrotik;
}

export default function MikrotikPage({ device }: MikrotikPageProps) {
  const { activeListMenu, setActiveListMenu } = useContext(MenuContext);

  useEffect(() => {
    const identity = device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value;
    const menu = activeListMenu.find((item) => item.label === identity);
    if (menu === undefined) {
      setActiveListMenu([
        ...activeListMenu,
        new Mikrotik(device).getMenuItem(),
      ]);
    }
  }, [activeListMenu, device, setActiveListMenu]);

  return (
    <>
      <CardDeviceInfo>
        <TableDeviceInfo device={device} />
      </CardDeviceInfo>
      <CardEthernet>
        <TableEthernet device={device} />
      </CardEthernet>
    </>
  );
}
