"use client";

import { emptyIPAddress } from "@/service/data/ip/address";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useContext, useState } from "react";
import { AddressContext } from "./Address.context";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { IPInterfaceService } from "@/service/IPInterfaceService";

export function AddressToolbar() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const { setFormData, setSubmitted, setDialogCreate, setDialogCreateHeader } =
    useContext(AddressContext);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const openNew = () => {
    setFormData(emptyIPAddress);
    setSubmitted(false);
    setDialogCreate(true);
    setDialogCreateHeader("Add New Address List");
  };

  const onRefresh = () => {
    setIsRefreshLoading(true);
    new IPInterfaceService().refresh(device._id).then((response) => {
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Refresh IP Address",
        });
        setIsRefreshLoading(false);
        setRefresh(true);
      }
    });
  };

  const startToolbarTemplate = () => {
    return (
      <div className="my-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          className="mr-2"
          onClick={openNew}
        />
      </div>
    );
  };

  const endToolbarTemplate = () => {
    return (
      <div className="my-2">
        <Button
          label="Refresh"
          icon="pi pi-refresh"
          severity="warning"
          onClick={onRefresh}
          loading={isRefreshLoading}
        />
      </div>
    );
  };

  return (
    <Toolbar
      className="mb-4"
      start={startToolbarTemplate}
      end={endToolbarTemplate}
    />
  );
}
