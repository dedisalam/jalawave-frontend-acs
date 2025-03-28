"use client";

import React, { useEffect, useState } from "react";
import CardResources from "@/components/molecules/card/mikrotik/CardResources";
import TableResources from "@/components/molecules/table/mikrotik/TableResources";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { Skeleton } from "primereact/skeleton";

interface ResourcesPageProps {
  params: Promise<{ id: string }>;
}

export default function ResourcesPage({ params }: ResourcesPageProps) {
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

    return (
      <CardResources>
        <TableResources device={deviceMikrotik} />
      </CardResources>
    );
  }
}
