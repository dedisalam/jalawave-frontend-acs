"use client";

import React from "react";
import { Card } from "primereact/card";

interface CardDevicesProps {
  children: React.ReactNode;
}

export default function CardDevices({ children }: CardDevicesProps) {
  return <Card title="Devices">{children}</Card>;
}
