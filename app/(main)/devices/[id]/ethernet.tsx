"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function Ethernet({ device }: { device: DeviceObjectMikrotik }) {
  const interfaces = [] as {
    field: string;
    value: string | number | boolean;
  }[];

  Object.keys(device.Device.Ethernet.Interface)
    .filter((key) => !key.includes("_"))
    .forEach((key) => {
      const item = parseInt(key, 10);
      interfaces.push({
        field: `Interface ${item} Name`,
        value: device.Device.Ethernet.Interface[item].X_MIKROTIK_Name._value,
      });
      interfaces.push({
        field: `Interface ${item} MAC Address`,
        value: device.Device.Ethernet.Interface[item].MACAddress._value,
      });
      interfaces.push({
        field: `Interface ${item} Current Bit Rate`,
        value: device.Device.Ethernet.Interface[item].CurrentBitRate._value,
      });
      interfaces.push({
        field: `Interface ${item} Enable`,
        value: device.Device.Ethernet.Interface[item].Enable._value,
      });
      interfaces.push({
        field: `Interface ${item} Status`,
        value: device.Device.Ethernet.Interface[item].Status._value,
      });
      interfaces.push({
        field: `Interface ${item} Comment`,
        value: device.Device.Ethernet.Interface[item].X_MIKROTIK_Comment._value,
      });
    });

  return (
    <>
      <DataTable value={interfaces} tableStyle={{ minWidth: "50rem" }}>
        <Column field="field" header="Field"></Column>
        <Column field="value" header="Value"></Column>
      </DataTable>
    </>
  );
}
