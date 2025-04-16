"use client";

import React from "react";
import { Card } from "primereact/card";

interface LinkCardProps {
  children: React.ReactNode;
}

export function LinkCard({ children }: LinkCardProps) {
  return <Card title="Link">{children}</Card>;
}
