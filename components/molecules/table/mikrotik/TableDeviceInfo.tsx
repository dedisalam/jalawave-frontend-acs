"use client";

import { Mikrotik } from "@/service/parser/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

interface TableDeviceInfoProps {
  device: DeviceObjectMikrotik;
}

export default function TableDeviceInfo({ device }: TableDeviceInfoProps) {
  const value = new Mikrotik(device).getDeviceInfo();

  return (
    <DataTable value={value} tableStyle={{ minWidth: "50rem" }}>
      <Column field="field" />
      <Column field="value" />
    </DataTable>
  );
}
