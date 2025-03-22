"use client";

import { DeviceObjectMikrotik } from "@/types/genieacs";
import { Card } from "primereact/card";
import React from "react";
import DeviceInfo from "./device-info";
import Ethernet from "./ethernet";

export default function DeviceMikrotik({
  device,
}: {
  device: DeviceObjectMikrotik;
}) {
  return (
    <>
      <Card title={"Device Information"} className="mb-4">
        <DeviceInfo device={device}></DeviceInfo>
      </Card>
      <Card title={"Ethernet"}>
        <Ethernet device={device}></Ethernet>
      </Card>
    </>
  );
}
