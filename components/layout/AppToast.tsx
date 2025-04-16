"use client";

import React, { useContext } from "react";
import { Toast } from "primereact/toast";
import { LayoutContext } from "./context/layoutcontext";

export function AppToast() {
  const { toast } = useContext(LayoutContext);

  return <Toast ref={toast} />;
}
