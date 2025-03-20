"use client";

import { MenuContext } from "@/layout/context/menucontext";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { AppMenuItem } from "@/types/layout";
import { Card } from "primereact/card";
import React, { useContext, useEffect } from "react";

export default function DeviceMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const { activeListMenu, setActiveListMenu } = useContext(MenuContext);

  const deviceInfoItems = Object.keys(device.Device.DeviceInfo)
    .filter((key) => !key.includes("_"))
    .map((key) => {
      return { label: key };
    }) as AppMenuItem[];

  useEffect(() => {
    if (activeListMenu[0].label === "Home") {
      setActiveListMenu([
        {
          label: "Device Info",
          items: deviceInfoItems,
        },
      ]);
    }
  }, [activeListMenu, deviceInfoItems, setActiveListMenu]);

  return (
    <>
      <Card
        title={device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value}
      ></Card>
    </>
  );
}
