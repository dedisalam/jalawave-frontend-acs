import { Card } from "primereact/card";
import { ReactNode } from "react";

interface DeviceCardProps {
  children: ReactNode;
}

export function DeviceCard({ children }: DeviceCardProps) {
  return <Card title="Device Detail">{children}</Card>;
}
