"use client";

import { Card } from "primereact/card";
import { ReactNode } from "react";

interface ResourcesCard {
  children: ReactNode;
}

export function ResourcesCard({ children }: ResourcesCard) {
  return <Card title="Resources">{children}</Card>;
}
