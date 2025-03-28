"use client";

import { Card } from "primereact/card";
import React from "react";

interface CardRebootProps {
  children: React.ReactNode;
}

export default function CardReboot({ children }: CardRebootProps) {
  return <Card title="Reboot Device">{children}</Card>;
}
