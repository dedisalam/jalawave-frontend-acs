"use client";

import { DeviceService } from "@/service/DeviceService";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";

interface RebootButtonProps {
  device: DeviceObjectMikrotik;
}

export function RebootButton({ device }: RebootButtonProps) {
  const [loading, setLoading] = useState(false);

  const accept = () => {
    setLoading(true);
    const deviceID = encodeURIComponent(device._id);
    DeviceService.reboot(deviceID).then(() => {
      setLoading(false);
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Button
        label="Reboot"
        className="p-button-danger"
        icon="pi pi-refresh"
        loading={loading}
        onClick={confirm1}
      />
    </>
  );
}
