"use client";

import { Card } from "primereact/card";
import { ReactNode } from "react";

interface UsersCardProps {
  children: ReactNode;
}

export function UsersCard({ children }: UsersCardProps) {
  return <Card title="Users">{children}</Card>;
}
