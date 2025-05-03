"use client";

import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

interface RemoveButtonProps {
  accept: () => void;
  loading: boolean;
}

export function RemoveButton({ accept, loading }: RemoveButtonProps) {
  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Button
        icon="pi pi-trash"
        rounded
        severity="danger"
        className="ml-3"
        loading={loading}
        onClick={confirm1}
      />
    </>
  );
}
