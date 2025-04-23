"use client";

import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { useContext, useState } from "react";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { LinkContext } from "./Link.context";
import { LinkService } from "./Link.service";

export function LinkToolbar() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const { isLoading, setIsLoading } = useContext(LinkContext);
  const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const create = async () => {
    setIsLoading(true);
    const response = await new LinkService().create(device._id);
    if (response.status === 200) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Create IP Address",
      });

      setIsLoading(false);
      setRefresh(true);
    } else {
      toast.current?.show({
        severity: "danger",
        summary: "Error",
        detail: `Error ${response.status} Code`,
      });
    }
  };

  const refresh = async () => {
    setIsRefreshLoading(true);
    const response = await new LinkService().refresh(device._id);
    if (response.status === 200) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Refresh Ethernet Link",
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

  const startToolbarTemplate = () => {
    return (
      <div className="my-2">
        <Button
          label="New"
          icon="pi pi-plus"
          severity="success"
          className="mr-2"
          onClick={create}
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
          onClick={refresh}
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
