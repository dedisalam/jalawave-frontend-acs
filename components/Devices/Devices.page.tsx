"use client";

import React, { useEffect, useContext } from "react";
import { MenuContext } from "@/components/layout/context/menucontext";
import { DevicesCard } from "./Devices.card";
import { DevicesTable } from "./Devices.table";

export function DevicesPage() {
  const { setActiveListMenu } = useContext(MenuContext);

  useEffect(() => {
    setActiveListMenu([
      {
        label: "Home",
        items: [{ label: "Devices", icon: "pi pi-fw pi-home", to: "/devices" }],
      },
    ]);
  }, [setActiveListMenu]);

  return (
    <DevicesCard>
      <DevicesTable />
    </DevicesCard>
  );
}
