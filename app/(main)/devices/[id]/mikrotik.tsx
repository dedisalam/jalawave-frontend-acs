"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import React, { useContext, useEffect, useState } from "react";
import DeviceInfo from "./device-info";
import Ethernet from "./ethernet";
import { MenuContext } from "@/layout/context/menucontext";

export default function DeviceMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const { activeListMenu, setActiveListMenu } = useContext(MenuContext);
  const [menuLength, setMenuLength] = useState(activeListMenu.length);

  useEffect(() => {
    if (activeListMenu.length === menuLength) {
      setActiveListMenu([
        ...activeListMenu,
        {
          label: device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value,
          icon: "pi pi-fw pi-cog",
          items: [
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
                  to: `/devices/${encodeURIComponent(
                    device._id
                  )}/system/reboot`,
                },
                {
                  label: "Resources",
                  icon: "pi pi-fw pi-database",
                  to: `/devices/${encodeURIComponent(
                    device._id
                  )}/system/resources`,
                },
              ],
            },
          ],
        },
      ]);
      setMenuLength(activeListMenu.length);
    }
  }, [setActiveListMenu, device, activeListMenu, menuLength]);

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
