"use client";

import { DeviceService } from "@/service/DeviceService";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Button } from "primereact/button";
import React, { useState } from "react";

interface ButtonRebootProps {
  device: DeviceObjectMikrotik;
}

export default function ButtonReboot({ device }: ButtonRebootProps) {
  const [loading, setLoading] = useState(false);

  const reboot = () => {
    setLoading(true);
    const deviceID = encodeURIComponent(device._id);
    DeviceService.reboot(deviceID).then(() => {
      setLoading(false);
    });
  };

  return (
    <Button
      label="Reboot"
      className="p-button-danger"
      icon="pi pi-refresh"
      loading={loading}
      onClick={reboot}
    />
  );
}
