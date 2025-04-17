"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { MikrotikContext } from "../../Mikrotik.context";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { EnableInput } from "./input/enable.input";
import { RadioContext } from "./Radio.context";
import { emptyWiFiRadio } from "@/service/data/wifi/radio";
import { WiFiRadioService } from "@/service/WiFiRadioService";

export function RadioDialog() {
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
  } = useContext(RadioContext);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const hide = () => {
    setSubmitted(false);
    setDialog(false);
  };

  const save = async () => {
    setSubmitted(true);
    setIsLoading(true);

    const response = await new WiFiRadioService().update(device._id, formData);
    if (response.status === 200) {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Success Change WiFi Radio",
      });

      setIsLoading(false);
      setRefresh(true);
      setDialog(false);
      setFormData(emptyWiFiRadio);
    } else {
      toast.current?.show({
        severity: "danger",
        summary: "Error",
        detail: `Error ${response.status} Code`,
      });
    }
  };

  const Footer = () => {
    return (
      <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hide} />
        <Button
          label="Save"
          icon="pi pi-check"
          text
          onClick={save}
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
    </Dialog>
  );
}
