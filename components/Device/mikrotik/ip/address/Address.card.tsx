"use client";

import { Card } from "primereact/card";
import React from "react";

interface AddressCardProps {
  children: React.ReactNode;
}

export function AddressCard({ children }: AddressCardProps) {
  return <Card title="Address List">{children}</Card>;
}
