"use client";

import React from "react";
import { CardAddressList } from "@/components/molecules/card/mikrotik/CardAddressList";
import { TableAddressList } from "@/components/molecules/table/mikrotik/TableAddressList";
import { DialogAddressList } from "@/components/molecules/dialog/mikrotik/DialogAddressList";
import { ToastAddressList } from "@/components/molecules/toast/ToastAddressList";

export default function AddressListPage() {
  return (
    <CardAddressList>
      <TableAddressList />
      <DialogAddressList />
      <ToastAddressList />
    </CardAddressList>
  );
}
