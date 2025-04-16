"use client";

import React from "react";
import { Card } from "primereact/card";

interface InterfaceCardProps {
  children: React.ReactNode;
}

export function InterfaceCard({ children }: InterfaceCardProps) {
  return <Card title="Interface">{children}</Card>;
}
