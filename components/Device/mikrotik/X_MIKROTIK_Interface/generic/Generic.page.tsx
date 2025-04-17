"use client";

import { GenericCard } from "./Generic.card";
import { GenericDialog } from "./Generic.dialog";
import { GenericTable } from "./Generic.table";
import { GenericToolbar } from "./Generic.toolbar";

export function GenericPage() {
  return (
    <GenericCard>
      <GenericToolbar />
      <GenericTable />
      <GenericDialog />
    </GenericCard>
  );
}
