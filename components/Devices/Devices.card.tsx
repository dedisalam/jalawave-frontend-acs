"use client";

import { Card } from "primereact/card";
import { ReactNode } from "react";

interface DevicesCardProps {
  children: ReactNode;
}

export function DevicesCard({ children }: DevicesCardProps) {
  return <Card title="Devices">{children}</Card>;
}
