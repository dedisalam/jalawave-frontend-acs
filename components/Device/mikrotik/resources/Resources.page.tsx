"use client";

import React, { useContext } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { ResourcesCard } from "./Resources.card";
import { ResourcesTable } from "./Resources.table";
import { ResourcesContext } from "./Resources.context";

export function ResourcesPage() {
  const { device } = useContext(ResourcesContext);

  if (device?._deviceId._Manufacturer === "MikroTik") {
    const deviceMikrotik = device as DeviceObjectMikrotik;

    return (
      <ResourcesCard>
        <ResourcesTable device={deviceMikrotik} />
      </ResourcesCard>
    );
  }
}
