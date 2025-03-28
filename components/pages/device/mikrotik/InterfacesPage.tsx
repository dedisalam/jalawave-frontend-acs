"use client";

import React, { useEffect, useState } from "react";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { Skeleton } from "primereact/skeleton";
import CardInterfaces from "@/components/molecules/card/mikrotik/CardInterfaces";
import { TableInterfaces } from "@/components/molecules/table/mikrotik/TableInterfaces";
import { TabMenu } from "primereact/tabmenu";
import { TableGeneric } from "@/components/molecules/table/mikrotik/TableGeneric";

interface InterfacesPageProps {
  params: Promise<{ id: string }>;
}

export default function InterfacesPage({ params }: InterfacesPageProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<DeviceObject>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

    const RenderTable = () => {
      switch (activeIndex) {
        case 0:
          return <TableInterfaces device={deviceMikrotik} />;
          break;

        case 1:
          return <TableGeneric device={deviceMikrotik} />;
          break;

        default:
          break;
      }
    };

    return (
      <CardInterfaces>
        <TabMenu
          model={[
            { label: "Ethernet", icon: "pi pi-list" },
            { label: "Generic", icon: "pi pi-list" },
          ]}
          onTabChange={(e) => setActiveIndex(e.index)}
          activeIndex={activeIndex}
        />
        <RenderTable />
      </CardInterfaces>
    );
  }
}
