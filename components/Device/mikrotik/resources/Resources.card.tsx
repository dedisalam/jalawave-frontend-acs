"use client";

import { Card } from "primereact/card";
import React from "react";

interface ResourcesCard {
  children: React.ReactNode;
}

export function ResourcesCard({ children }: ResourcesCard) {
  return <Card title="Resources">{children}</Card>;
}
