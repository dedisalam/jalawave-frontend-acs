"use client";

import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { TabMenu } from "primereact/tabmenu";
import React, { useEffect, useState } from "react";
import DeviceMikrotik from "./mikrotik";

export default function SystemRebootPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<DeviceObject>();

  useEffect(() => {
    params.then((params) => {
      setId(params.id);
    });
    if (id) {
      DeviceService.getDetail(id).then((data: DeviceObject[]) => {
        setDevice(data[0]);
        setLoading(false);
      });
    }
  }, [params, id]);

  if (loading) {
    return (
      <>
        <Skeleton height="8rem"></Skeleton>
      </>
    );
  }

  if (device?._deviceId._Manufacturer === "MikroTik") {
    const mikrotik = device as DeviceObjectMikrotik;

    return <DeviceMikrotik device={mikrotik}></DeviceMikrotik>;
  }

  return (
    <Card title="Device Detail">
      <TabMenu
        model={[
          { label: "Overview", icon: "pi pi-eye" },
          { label: "Detailed Entries", icon: "pi pi-list" },
          { label: "Log History", icon: "pi pi-clock" },
        ]}
      ></TabMenu>
    </Card>
  );
}
