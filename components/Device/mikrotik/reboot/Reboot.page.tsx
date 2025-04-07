"use client";

import React, { useContext } from "react";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { RebootCard } from "./Reboot.card";
import { RebootButton } from "./Reboot.button";
import { RebootContext } from "./Reboot.context";

export function RebootPage() {
  const { device } = useContext(RebootContext);

  if (device?._deviceId._Manufacturer === "MikroTik") {
    const deviceMikrotik = device as DeviceObjectMikrotik;

    return (
      <RebootCard>
        <RebootButton device={deviceMikrotik} />
      </RebootCard>
    );
  }
}
