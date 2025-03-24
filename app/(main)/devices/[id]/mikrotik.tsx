"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import React, { useContext, useEffect } from "react";
import DeviceInfo from "./device-info";
import Ethernet from "./ethernet";
import { MenuContext } from "@/layout/context/menucontext";

export default function DeviceMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const { setActiveListMenu } = useContext(MenuContext);

  useEffect(() => {
    setActiveListMenu([
      {
        label: "IP",
        icon: "pi pi-fw pi-cog",
        items: [
          {
            label: "Address",
            icon: "pi pi-fw pi-globe",
            to: `/devices/${encodeURIComponent(device._id)}/ip/address`,
          },
        ],
      },
      {
        label: "System",
        icon: "pi pi-fw pi-cog",
        items: [
          {
            label: "Reboot",
            icon: "pi pi-fw pi-refresh",
            to: `/devices/${encodeURIComponent(device._id)}/system/reboot`,
          },
          {
            label: "Resources",
            icon: "pi pi-fw pi-database",
            to: `/devices/${encodeURIComponent(device._id)}/system/resources`,
          },
        ],
      },
    ]);
  }, [setActiveListMenu, device]);

  return (
    <>
      <Card title={"Device Information"} className="mb-4">
        <DeviceInfo device={device}></DeviceInfo>
      </Card>
      <Card title={"Ethernet"}>
        <Ethernet device={device}></Ethernet>
      </Card>
    </>
  );
}
