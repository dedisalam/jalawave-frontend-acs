"use client";

import { Card } from "primereact/card";
import React from "react";

interface RebootCardProps {
  children: React.ReactNode;
}

export function RebootCard({ children }: RebootCardProps) {
  return <Card title="Reboot Device">{children}</Card>;
}
