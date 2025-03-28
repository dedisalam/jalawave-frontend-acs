"use client";

import React from "react";
import { Mikrotik } from "@/parsers/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

interface TableEthernetProps {
  device: DeviceObjectMikrotik;
}

export default function TableEthernet({ device }: TableEthernetProps) {
  const value = new Mikrotik(device).getEthernets();

  return (
    <DataTable value={value} tableStyle={{ minWidth: "50rem" }}>
      <Column field="field"></Column>
      <Column field="value"></Column>
    </DataTable>
  );
}
