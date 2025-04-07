"use client";

import React from "react";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

interface ResourcesTableProps {
  device: DeviceObjectMikrotik;
}

export function ResourcesTable({ device }: ResourcesTableProps) {
  const value = new Mikrotik(device).getResources();

  return (
    <DataTable value={value} tableStyle={{ minWidth: "50rem" }}>
      <Column field="field"></Column>
      <Column field="value"></Column>
    </DataTable>
  );
}
