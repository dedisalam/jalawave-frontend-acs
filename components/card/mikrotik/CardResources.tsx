"use client";

import { Card } from "primereact/card";
import React from "react";

interface CardResources {
  children: React.ReactNode;
}

export default function CardResources({ children }: CardResources) {
  return <Card title="Resources">{children}</Card>;
}
