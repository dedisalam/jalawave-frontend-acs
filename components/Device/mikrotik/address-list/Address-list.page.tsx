"use client";

import { AddressListCard } from "./Address-list.card";
import { AddressListTable } from "./Address-list.table";
import { AddressListDialog } from "./Address-list.dialog";
import { AddressListToast } from "./Address-list.toast";

export function AddressListPage() {
  return (
    <AddressListCard>
      <AddressListTable />
      <AddressListDialog />
      <AddressListToast />
    </AddressListCard>
  );
}
