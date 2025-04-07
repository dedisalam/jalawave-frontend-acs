"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { AddressListContext } from "@/components/Device/mikrotik/address-list/Address-list.context";
import { Button } from "primereact/button";
import { AddressListIPInput } from "./Address-list-ip.input";

export function AddressListDialog() {
  const { dialog, dialogHeader, saveIP, data, setSubmitted, setDialog } =
    useContext(AddressListContext);

  const hide = () => {
    setSubmitted(false);
    setDialog(false);
  };

  const Footer = () => {
    if (data.value.AddressingType._value === "Static") {
      return (
        <>
          <Button label="Cancel" icon="pi pi-times" text onClick={hide} />
          <Button label="Save" icon="pi pi-check" text onClick={saveIP} />
        </>
      );
    }
  };

  return (
    <Dialog
      visible={dialog}
      style={{ width: "450px" }}
      header={dialogHeader}
      modal
      className="p-fluid"
      footer={Footer}
      onHide={hide}
    >
      <AddressListIPInput />
    </Dialog>
  );
}
