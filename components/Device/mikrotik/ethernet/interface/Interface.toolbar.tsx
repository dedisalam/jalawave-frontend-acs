"use client";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useContext, useState } from "react";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { EthernetInterfaceService } from "@/service/EthernetInterfaceService";

export function InterfaceToolbar() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const refresh = async () => {
    setIsRefreshLoading(true);
    const response = await new EthernetInterfaceService().refresh(device._id);
    if (response.status === 200) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Refresh Ethernet Interface",
      });

      setIsRefreshLoading(false);
      setRefresh(true);
    } else {
      toast.current?.show({
        severity: "danger",
        summary: "Error",
        detail: `Error ${response.status} Code`,
      });
    }
  };

  const endToolbarTemplate = () => {
    return (
      <div className="my-2">
        <Button
          label="Refresh"
          icon="pi pi-refresh"
          severity="warning"
          onClick={refresh}
          loading={isRefreshLoading}
        />
      </div>
    );
  };

  return <Toolbar className="mb-4" end={endToolbarTemplate} />;
}
