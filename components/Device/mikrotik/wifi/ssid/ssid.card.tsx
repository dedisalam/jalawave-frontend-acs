"use client";

import React from "react";
import { Card } from "primereact/card";

interface SSIDCardProps {
  children: React.ReactNode;
}

export function SSIDCard({ children }: SSIDCardProps) {
  return <Card title="SSID">{children}</Card>;
}
