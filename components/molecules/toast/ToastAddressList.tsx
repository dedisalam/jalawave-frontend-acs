"use client";

import React, { useContext } from "react";
import { Toast } from "primereact/toast";
import { AddressListContext } from "@/components/pages/device/mikrotik/context/AddressListContext";

export function ToastAddressList() {
  const { toast } = useContext(AddressListContext);

  return <Toast ref={toast} />;
}
