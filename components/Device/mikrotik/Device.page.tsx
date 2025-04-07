"use client";

import React, { useContext, useEffect } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuContext } from "@/components/layout/context/menucontext";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { DeviceInfoCard } from "./Device-info.card";
import { DeviceInfoTable } from "./Device-info.table";
import { EthernetCard } from "./Ethernet.card";
import { EthernetTable } from "./Ethernet.table";

interface DevicePageProps {
  device: DeviceObjectMikrotik;
}

export function DevicePage({ device }: DevicePageProps) {
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
      <DeviceInfoCard>
        <DeviceInfoTable device={device} />
      </DeviceInfoCard>
      <EthernetCard>
        <EthernetTable device={device} />
      </EthernetCard>
    </>
  );
}
