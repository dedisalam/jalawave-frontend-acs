"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useState } from "react";

interface RowData {
  interface?: string;
  ip: string;
  network: string;
  flag: string;
}

export function DialogAddressList() {
  const emptyIP: RowData = {
    flag: "",
    ip: "",
    network: "",
    interface: "",
  };

  const [IP, setIP] = useState<RowData>(emptyIP);
  const [IPDialog, setIPDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hideDialog = () => {
    setSubmitted(false);
    setIPDialog(false);
  };

  const saveIP = () => {
    setSubmitted(true);

    setIPDialog(false);
    setIP(emptyIP);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    const _IP = { ...IP };
    _IP[name as keyof RowData] = val;

    setIP(_IP);
  };

  const IPDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveIP} />
    </>
  );

  return (
    <Dialog
      visible={IPDialog}
      style={{ width: "450px" }}
      header="IP Details"
      modal
      className="p-fluid"
      footer={IPDialogFooter}
      onHide={hideDialog}
    >
      <div className="field">
        <label htmlFor="ip">IP</label>
        <InputText
          id="ip"
          value={IP.ip}
          onChange={(e) => onInputChange(e, "ip")}
          required
          autoFocus
          className={classNames({
            "p-invalid": submitted && !IP.ip,
          })}
        />
        {submitted && !IP.ip && (
          <small className="p-invalid">IP is required.</small>
        )}
      </div>
    </Dialog>
  );
}
