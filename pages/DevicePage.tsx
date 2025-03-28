"use client";

import React, { useEffect, useState } from "react";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { TabMenu } from "primereact/tabmenu";
import MikrotikPage from "./device/MikrotikPage";

interface DevicePageProps {
  params: Promise<{ id: string }>;
}

export default function DevicePage({ params }: DevicePageProps) {
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

  if (loading || device === undefined) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  if (device._deviceId._Manufacturer === "MikroTik") {
    const deviceMikrotik = device as DeviceObjectMikrotik;

    return <MikrotikPage device={deviceMikrotik} />;
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
