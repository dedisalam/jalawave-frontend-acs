"use client";

import React, { useContext } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { TabMenu } from "primereact/tabmenu";
import { InterfacesCard } from "./Interfaces.card";
import { InterfacesTable } from "./Interfaces.table";
import { InterfacesGenericTable } from "./Interfaces-generic.table";
import { InterfacesContext } from "./Interfaces.context";

export function InterfacesPage() {
  const { device, activeIndex, setActiveIndex } = useContext(InterfacesContext);

  if (device?._deviceId._Manufacturer === "MikroTik") {
    const deviceMikrotik = device as DeviceObjectMikrotik;

    const RenderTable = () => {
      switch (activeIndex) {
        case 0:
          return <InterfacesTable device={deviceMikrotik} />;
          break;

        case 1:
          return <InterfacesGenericTable device={deviceMikrotik} />;
          break;

        default:
          break;
      }
    };

    return (
      <InterfacesCard>
        <TabMenu
          model={[
            { label: "Ethernet", icon: "pi pi-list" },
            { label: "Generic", icon: "pi pi-list" },
          ]}
          onTabChange={(e) => setActiveIndex(e.index)}
          activeIndex={activeIndex}
        />
        <RenderTable />
      </InterfacesCard>
    );
  }
}
