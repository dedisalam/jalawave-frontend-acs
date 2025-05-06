import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

interface LogoutButtonProps {
  accept: () => void;
  group: string;
}

export function LogoutButton({ accept, group }: LogoutButtonProps) {
  const confirm = () => {
    confirmDialog({
      group,
      message: "Are you sure you want to logout?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
    });
  };

  return (
    <>
      <ConfirmDialog group={group} />
      <button
        type="button"
        className="p-link layout-topbar-button"
        onClick={confirm}
      >
        <i className="pi pi-sign-out"></i>
        <span>Logout</span>
      </button>
    </>
  );
}
