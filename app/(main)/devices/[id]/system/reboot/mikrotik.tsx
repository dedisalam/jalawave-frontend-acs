"use client";

import { DeviceService } from "@/service/DeviceService";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useState } from "react";

export default function SystemReboot({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  const [loading, setLoading] = useState(false);

  const reboot = () => {
    setLoading(true);
    DeviceService.reboot(encodeURIComponent(device._id)).then(() => {
      setLoading(false);
    });
  };

  return (
    <Card
      title={`Reboot ${device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value}`}
      className="mb-4"
    >
      <Button
        label="Reboot"
        className="p-button-danger"
        icon="pi pi-refresh"
        loading={loading}
        onClick={reboot}
      />
    </Card>
  );
}
