"use client";

import React, { useContext } from "react";
import { Toast } from "primereact/toast";
import { FullPageContext } from "./FullPage.context";

export function FullPageToast() {
  const { toast } = useContext(FullPageContext);

  return <Toast ref={toast} />;
}
