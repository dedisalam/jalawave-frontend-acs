"use client";

import React from "react";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

interface EthernetTableProps {
  device: DeviceObjectMikrotik;
}

export function EthernetTable({ device }: EthernetTableProps) {
  const value = new Mikrotik(device).getEthernets();

  return (
    <DataTable value={value} tableStyle={{ minWidth: "50rem" }}>
      <Column field="field"></Column>
      <Column field="value"></Column>
    </DataTable>
  );
}
