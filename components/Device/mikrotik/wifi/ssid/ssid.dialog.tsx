"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { NameInput } from "./input/name.input";
import { Skeleton } from "primereact/skeleton";
import { MikrotikContext } from "../../Mikrotik.context";
import { SSIDContext } from "./ssid.context";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { SSIDService } from "./ssid.service";
import { emptyData } from "./ssid.data";
import { EnableInput } from "./input/enable.input";
import { LowerLayersInput } from "./input/lowerLayers.input";

export function SSIDDialog() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const {
    dialog,
    dialogHeader,
    setSubmitted,
    setDialog,
    isLoading,
    setIsLoading,
    formData,
    setFormData,
  } = useContext(SSIDContext);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const hide = () => {
    setSubmitted(false);
    setDialog(false);
  };

  const saveIP = async () => {
    setSubmitted(true);
    setIsLoading(true);

    if (formData.SSID._value.trim()) {
      const response = await new SSIDService().update(device._id, formData);
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Change SSID",
        });

        setSubmitted(false);
        setRefresh(true);
        setDialog(false);
        setFormData(emptyData);
      } else {
        toast.current?.show({
          severity: "danger",
          summary: "Error",
          detail: `Error ${response.status} Code`,
        });
      }
    }

    setIsLoading(false);
  };

  const Footer = () => {
    return (
      <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hide} />
        <Button
          label="Save"
          icon="pi pi-check"
          text
          onClick={saveIP}
          loading={isLoading}
        />
      </>
    );
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
      <EnableInput />
      <NameInput />
      <LowerLayersInput />
    </Dialog>
  );
}
