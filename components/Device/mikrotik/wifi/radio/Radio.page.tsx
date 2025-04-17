"use client";

import { RadioCard } from "./Radio.card";
import { RadioDialog } from "./Radio.dialog";
import { RadioTable } from "./Radio.table";
import { RadioToolbar } from "./Radio.toolbar";

export function RadioPage() {
  return (
    <RadioCard>
      <RadioToolbar />
      <RadioTable />
      <RadioDialog />
    </RadioCard>
  );
}
