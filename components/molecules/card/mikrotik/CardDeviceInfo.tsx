"use client";

import React from "react";
import { Card } from "primereact/card";

interface CardDeviceInfo {
  children: React.ReactNode;
}

export default function CardDeviceInfo({ children }: CardDeviceInfo) {
  return <Card title="Device Information">{children}</Card>;
}
