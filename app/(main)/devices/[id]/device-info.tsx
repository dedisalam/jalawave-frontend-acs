"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function DeviceInfo({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const deviceInfo = [];

  deviceInfo.push({
    field: "Description",
    value: device.Device.DeviceInfo.Description._value,
  });
  deviceInfo.push({
    field: "Hardware Version",
    value: device.Device.DeviceInfo.HardwareVersion._value,
  });
  deviceInfo.push({
    field: "Manufacturer",
    value: device.Device.DeviceInfo.Manufacturer._value,
  });
  deviceInfo.push({
    field: "Manufacturer OUI",
    value: device.Device.DeviceInfo.ManufacturerOUI._value,
  });
  deviceInfo.push({
    field: "Total Memory",
    value: device.Device.DeviceInfo.MemoryStatus.Total._value,
  });
  deviceInfo.push({
    field: "Free Memory",
    value: device.Device.DeviceInfo.MemoryStatus.Free._value,
  });
  deviceInfo.push({
    field: "Model Name",
    value: device.Device.DeviceInfo.ModelName._value,
  });
  deviceInfo.push({
    field: "Serial Number",
    value: device.Device.DeviceInfo.SerialNumber._value,
  });
  deviceInfo.push({
    field: "Software Version",
    value: device.Device.DeviceInfo.SoftwareVersion._value,
  });
  deviceInfo.push({
    field: "Up Time",
    value: device.Device.DeviceInfo.UpTime._value,
  });
  Object.keys(device.Device.DeviceInfo.VendorConfigFile)
    .filter((key) => !key.includes("_"))
    .forEach((key) => {
      const item = parseInt(key, 10);
      deviceInfo.push({
        field: `Vendor Config File ${item} Name`,
        value: device.Device.DeviceInfo.VendorConfigFile[item].Name._value,
      });
      deviceInfo.push({
        field: `Vendor Config File ${item} Description`,
        value:
          device.Device.DeviceInfo.VendorConfigFile[item].Description._value,
      });
      deviceInfo.push({
        field: `Vendor Config File ${item} Use For Backup Restore`,
        value:
          device.Device.DeviceInfo.VendorConfigFile[item].UseForBackupRestore
            ._value,
      });
    });

  return (
    <>
      <DataTable value={deviceInfo} tableStyle={{ minWidth: "50rem" }}>
        <Column field="field" header="Field"></Column>
        <Column field="value" header="Value"></Column>
      </DataTable>
    </>
  );
}
