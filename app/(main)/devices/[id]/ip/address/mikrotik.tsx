"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import React from "react";

export function IpAddressMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  return (
    <Card
      title={`IP Address ${device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value}`}
      className="mb-4"
    >
      IP Address
    </Card>
  );
}
