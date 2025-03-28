"use client";

import { Card } from "primereact/card";
import React from "react";

interface CardAddressListProps {
  children: React.ReactNode;
}

export function CardAddressList({ children }: CardAddressListProps) {
  return <Card title="Address List">{children}</Card>;
}
