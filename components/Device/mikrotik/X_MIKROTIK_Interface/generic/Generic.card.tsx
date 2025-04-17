"use client";

import React from "react";
import { Card } from "primereact/card";

interface GenericCardProps {
  children: React.ReactNode;
}

export function GenericCard({ children }: GenericCardProps) {
  return <Card title="Generic">{children}</Card>;
}
