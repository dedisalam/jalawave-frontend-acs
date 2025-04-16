"use client";

import React from "react";
import { Card } from "primereact/card";

interface RadioCardProps {
  children: React.ReactNode;
}

export function RadioCard({ children }: RadioCardProps) {
  return <Card title="Radio">{children}</Card>;
}
