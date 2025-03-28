"use client";

import React from "react";
import { Toast } from "primereact/toast";

interface ToastAddressListProps {
  toast: React.RefObject<Toast | null>;
}

export default function ToastAddressList({ toast }: ToastAddressListProps) {
  return <Toast ref={toast} />;
}
