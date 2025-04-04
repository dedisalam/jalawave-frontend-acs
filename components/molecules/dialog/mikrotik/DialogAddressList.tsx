"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { AddressListContext } from "@/components/pages/device/mikrotik/context/AddressListContext";
import { InputIP } from "@/components/atoms/InputIP";
import { Button } from "primereact/button";

export function DialogAddressList() {
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
      <InputIP />
    </Dialog>
  );
}
