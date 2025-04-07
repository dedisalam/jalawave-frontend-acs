"use client";

import { Card } from "primereact/card";
import React from "react";

interface AddressListCardProps {
  children: React.ReactNode;
}

export function AddressListCard({ children }: AddressListCardProps) {
  return <Card title="Address List">{children}</Card>;
}
