import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

interface RemoveButtonProps {
  accept: () => void;
  loading: boolean;
  group: string;
}

export function RemoveButton({ accept, loading, group }: RemoveButtonProps) {
  const confirm = () => {
    confirmDialog({
      group,
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
    });
  };

  return (
    <>
      <ConfirmDialog group={group} />
      <Button
        icon="pi pi-trash"
        rounded
        severity="danger"
        className="ml-3"
        loading={loading}
        onClick={confirm}
      />
    </>
  );
}
