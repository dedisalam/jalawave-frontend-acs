"use client";

import React from "react";
import { Card } from "primereact/card";

interface CardEthernetProps {
  children: React.ReactNode;
}

export default function CardEthernet({ children }: CardEthernetProps) {
  return <Card title="Ethernet">{children}</Card>;
}
