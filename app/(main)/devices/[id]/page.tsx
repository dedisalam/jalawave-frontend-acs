"use client";

import { DeviceService } from "@/service/DeviceService";
import { Device } from "@/types/table";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { TabMenu } from "primereact/tabmenu";
import React, { useEffect, useState } from "react";

export default function DevicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<Device>();

  useEffect(() => {
    params.then((params) => {
      setId(params.id);
    });
    if (id) {
      DeviceService.getData(id).then((data: Device[]) => {
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

  return (
    <Card title={device?.identity}>
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
