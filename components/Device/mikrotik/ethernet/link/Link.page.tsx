"use client";

import { LinkCard } from "./Link.card";
import { LinkDialog } from "./Link.dialog";
import { LinkTable } from "./Link.table";

export function LinkPage() {
  return (
    <LinkCard>
      <LinkTable />
      <LinkDialog />
    </LinkCard>
  );
}
