"use client";

import { InterfaceCard } from "./Interface.card";
import { InterfaceDialog } from "./Interface.dialog";
import { InterfaceTable } from "./Interface.table";
import { InterfaceToolbar } from "./Interface.toolbar";

export function InterfacePage() {
  return (
    <InterfaceCard>
      <InterfaceToolbar />
      <InterfaceTable />
      <InterfaceDialog />
    </InterfaceCard>
  );
}
