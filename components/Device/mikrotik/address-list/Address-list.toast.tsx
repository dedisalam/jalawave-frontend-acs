"use client";

import React, { useContext } from "react";
import { Toast } from "primereact/toast";
import { AddressListContext } from "@/components/Device/mikrotik/address-list/Address-list.context";

export function AddressListToast() {
  const { toast } = useContext(AddressListContext);

  return <Toast ref={toast} />;
}
