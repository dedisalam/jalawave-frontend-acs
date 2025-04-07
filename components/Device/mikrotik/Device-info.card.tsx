"use client";

import { Card } from "primereact/card";
import { ReactNode } from "react";

interface DeviceInfoCardProps {
  children: ReactNode;
}

export function DeviceInfoCard({ children }: DeviceInfoCardProps) {
  return <Card title="Device Information">{children}</Card>;
}
