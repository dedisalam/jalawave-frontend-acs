"use client";

import React from "react";
import { Card } from "primereact/card";

interface CardInterfacesProps {
  children: React.ReactNode;
}

export default function CardInterfaces({ children }: CardInterfacesProps) {
  return <Card title="Interfaces">{children}</Card>;
}
