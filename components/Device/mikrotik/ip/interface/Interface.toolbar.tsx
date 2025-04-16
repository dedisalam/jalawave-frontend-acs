"use client";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useContext, useState } from "react";
import { IPInterfaceService } from "@/service/IPInterfaceService";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { InterfaceContext } from "./Interface.context";

export function InterfaceToolbar() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const { isLoading, setIsLoading } = useContext(InterfaceContext);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const openNew = () => {
    setIsLoading(true);
    new IPInterfaceService().create(device._id).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Add IP Interface",
      });
      setIsLoading(false);
      setRefresh(true);
    });
  };

  const onRefresh = () => {
    setIsRefreshLoading(true);
    new IPInterfaceService().refresh(device._id).then((response) => {
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Refresh IP Interface",
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
          onClick={openNew}
          loading={isLoading}
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
