"use client";

import React, { useEffect, useState } from "react";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { Skeleton } from "primereact/skeleton";
import { CardAddressList } from "@/components/card/mikrotik/CardAddressList";
import { TableAddressList } from "@/components/table/mikrotik/TableAddressList";

interface AddressListPageProps {
  params: Promise<{ id: string }>;
}

export default function AddressListPage({ params }: AddressListPageProps) {
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
      <CardAddressList>
        <TableAddressList device={deviceMikrotik} />
      </CardAddressList>
    );
  }
}
