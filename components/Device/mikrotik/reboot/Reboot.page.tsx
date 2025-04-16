"use client";

import React, { useContext } from "react";
import { RebootCard } from "./Reboot.card";
import { RebootButton } from "./Reboot.button";
import { MikrotikContext } from "../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";

export function RebootPage() {
  const { device } = useContext(MikrotikContext);

  if (!device) {
    return <Skeleton height="51rem"></Skeleton>;
  }

  return (
    <RebootCard>
      <RebootButton device={device} />
    </RebootCard>
  );
}
