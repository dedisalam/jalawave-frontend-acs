"use client";

import { LinkCard } from "./Link.card";
import { LinkDialog } from "./Link.dialog";
import { LinkTable } from "./Link.table";
import { LinkToolbar } from "./Link.toolbar";

export function LinkPage() {
  return (
    <LinkCard>
      <LinkToolbar />
      <LinkTable />
      <LinkDialog />
    </LinkCard>
  );
}
