"use client";

import { InterfaceCard } from "./Interface.card";
import { InterfaceDialog } from "./Interface.dialog";
import { InterfaceTable } from "./Interface.table";

export function InterfacePage() {
  return (
    <InterfaceCard>
      <InterfaceTable />
      <InterfaceDialog />
    </InterfaceCard>
  );
}
