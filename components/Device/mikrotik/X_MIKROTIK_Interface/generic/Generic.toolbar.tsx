"use client";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useContext, useState } from "react";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { GenericService } from "./Generic.service";

export function GenericToolbar() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const onRefresh = () => {
    setIsRefreshLoading(true);
    new GenericService().refresh(device._id).then((response) => {
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Refresh Interface Generic",
        });
        setIsRefreshLoading(false);
        setRefresh(true);
      }
    });
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

  return <Toolbar className="mb-4" end={endToolbarTemplate} />;
}
