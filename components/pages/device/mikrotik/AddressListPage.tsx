"use client";

import React, { useEffect, useRef, useState } from "react";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { Skeleton } from "primereact/skeleton";
import { CardAddressList } from "@/components/molecules/card/mikrotik/CardAddressList";
import { TableAddressList } from "@/components/molecules/table/mikrotik/TableAddressList";
import { DialogAddressList } from "@/components/molecules/dialog/mikrotik/DialogAddressList";
import { emptyAddressList } from "@/service/data/addresslist";
import { AddressListRow } from "@/types/mikrotik/addresslist";
import { Toast } from "primereact/toast";
import ToastAddressList from "@/components/molecules/toast/ToastAddressList";

interface AddressListPageProps {
  params: Promise<{ id: string }>;
}

export default function AddressListPage({ params }: AddressListPageProps) {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<DeviceObject>();
  const stateDialog = useState(false);
  const stateDialogHeader = useState<string>("");
  const stateData = useState<AddressListRow>(emptyAddressList);
  const [requery, setRequery] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    params.then((params) => {
      setId(params.id);
    });
    if (id || requery) {
      DeviceService.getDetail(id).then((data: DeviceObject[]) => {
        setDevice(data[0]);
        setLoading(false);
      });
    }
  }, [params, id, requery]);

  if (loading || device === undefined) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  if (device._deviceId._Manufacturer === "MikroTik") {
    const deviceMikrotik = device as DeviceObjectMikrotik;

    return (
      <CardAddressList>
        <TableAddressList
          device={deviceMikrotik}
          stateDialog={stateDialog}
          stateDialogHeader={stateDialogHeader}
          stateData={stateData}
        />
        <DialogAddressList
          stateDialog={stateDialog}
          stateDialogHeader={stateDialogHeader}
          stateData={stateData}
          setRequery={setRequery}
          device={deviceMikrotik}
          toast={toast}
        />
        <ToastAddressList toast={toast} />
      </CardAddressList>
    );
  }
}
