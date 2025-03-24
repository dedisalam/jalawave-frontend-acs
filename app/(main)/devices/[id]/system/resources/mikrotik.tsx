"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function SystemResources({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const resources = [];
  resources.push({
    field: "Uptime",
    value: device.Device.DeviceInfo.UpTime._value,
  });
  resources.push({
    field: "Free Memory",
    value: Math.round(
      Number(device.Device.DeviceInfo.MemoryStatus.Free._value) / 1024
    ).toPrecision(4),
  });
  resources.push({
    field: "Total Memory",
    value: Math.round(
      Number(device.Device.DeviceInfo.MemoryStatus.Total._value) / 1024
    ).toPrecision(4),
  });

  return (
    <Card
      title={`Resources of ${device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value}`}
      className="mb-4"
    >
      <DataTable value={resources} tableStyle={{ minWidth: "50rem" }}>
        <Column field="field" header="Field"></Column>
        <Column field="value" header="Value"></Column>
      </DataTable>
    </Card>
  );
}
