"use client";

import { useContext } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { TabMenu } from "primereact/tabmenu";
import { DevicePage as DeviceMikrotikPage } from "./mikrotik/Device.page";
import { DeviceCard } from "./Device.card";
import { DeviceContext } from "./Device.context";

export function DevicePage() {
  const { device } = useContext(DeviceContext);

  if (device?._deviceId._Manufacturer === "MikroTik") {
    const deviceMikrotik = device as DeviceObjectMikrotik;

    return <DeviceMikrotikPage device={deviceMikrotik} />;
  }

  return (
    <DeviceCard>
      <TabMenu
        model={[
          { label: "Overview", icon: "pi pi-eye" },
          { label: "Detailed Entries", icon: "pi pi-list" },
          { label: "Log History", icon: "pi pi-clock" },
        ]}
      ></TabMenu>
    </DeviceCard>
  );
}
