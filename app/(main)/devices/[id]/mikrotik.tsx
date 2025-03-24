"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import React, { useEffect } from "react";
import DeviceInfo from "./device-info";
import Ethernet from "./ethernet";
import { Button } from "primereact/button";
import { DeviceService } from "@/service/DeviceService";

export default function DeviceMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  useEffect(() => {
    console.log(device._id);
  }, [device._id]);

  return (
    <>
      <Card
        title={device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value}
        className="mb-4"
      >
        <Button
          label="Reboot"
          icon="pi pi-refresh"
          className="p-button-danger"
          onClick={() => DeviceService.reboot(encodeURIComponent(device._id))}
        />
      </Card>
      <Card title={"Device Information"} className="mb-4">
        <DeviceInfo device={device}></DeviceInfo>
      </Card>
      <Card title={"Ethernet"}>
        <Ethernet device={device}></Ethernet>
      </Card>
    </>
  );
}
