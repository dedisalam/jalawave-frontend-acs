"use client";

import { GenericCard } from "./Generic.card";
import { GenericTable } from "./Generic.table";
import { GenericToolbar } from "./Generic.toolbar";

export function GenericPage() {
  return (
    <GenericCard>
      <GenericToolbar />
      <GenericTable />
    </GenericCard>
  );
}
