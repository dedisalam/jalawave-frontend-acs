"use client";

import React from "react";
import { Card } from "primereact/card";

interface InterfacesCardProps {
  children: React.ReactNode;
}

export function InterfacesCard({ children }: InterfacesCardProps) {
  return <Card title="Interfaces">{children}</Card>;
}
