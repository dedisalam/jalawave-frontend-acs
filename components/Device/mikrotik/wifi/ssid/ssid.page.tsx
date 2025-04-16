"use client";

import { SSIDCard } from "./ssid.card";
import { SSIDDialog } from "./ssid.dialog";
import { SSIDTable } from "./ssid.table";

export function SSIDPage() {
  return (
    <SSIDCard>
      <SSIDTable />
      <SSIDDialog />
    </SSIDCard>
  );
}
