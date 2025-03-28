"use client";

import React, { useEffect, useState } from "react";
import ButtonReboot from "@/components/button/ButtonReboot";
import CardReboot from "@/components/card/mikrotik/CardReboot";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { DeviceService } from "@/service/DeviceService";
import { Skeleton } from "primereact/skeleton";

interface RebootPageProps {
  params: Promise<{ id: string }>;
}

export default function RebootPage({ params }: RebootPageProps) {
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
      <CardReboot>
        <ButtonReboot device={deviceMikrotik} />
      </CardReboot>
    );
  }
}
