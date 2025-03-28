"use client";

import React, { useEffect, useContext } from "react";
import { MenuContext } from "@/layout/context/menucontext";
import TableDevices from "@/components/table/TableDevices";
import CardDevices from "@/components/card/CardDevices";

export default function DevicesPage() {
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
    <CardDevices>
      <TableDevices />
    </CardDevices>
  );
}
