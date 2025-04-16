"use client";

import { AddressCard } from "./Address.card";
import { AddressDialog } from "./Address.dialog";
import { AddressDialogCreate } from "./Address.dialog-create";
import { AddressTable } from "./Address.table";
import { AddressToolbar } from "./Address.toolbar";

export function AddressPage() {
  return (
    <>
      <AddressCard>
        <AddressToolbar />
        <AddressTable />
        <AddressDialog />
        <AddressDialogCreate />
      </AddressCard>
    </>
  );
}
