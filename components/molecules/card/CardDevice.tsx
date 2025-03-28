"use client";

import React from "react";
import { Card } from "primereact/card";

interface CardDeviceProps {
  children: React.ReactNode;
}

export default function CardDevice({ children }: CardDeviceProps) {
  return <Card title="Device Detail">{children}</Card>;
}
