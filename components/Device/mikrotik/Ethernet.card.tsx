"use client";

import { Card } from "primereact/card";
import { ReactNode } from "react";

interface EthernetCardProps {
  children: ReactNode;
}

export function EthernetCard({ children }: EthernetCardProps) {
  return <Card title="Ethernet">{children}</Card>;
}
