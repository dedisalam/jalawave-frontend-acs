"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { MikrotikContext } from "../../Mikrotik.context";
import { LinkContext } from "./Link.context";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { InterfaceInput } from "./input/interface.input";
import { emptyLink } from "@/service/data/ethernet/link";
import { EthernetLinkService } from "@/service/EthernetLinkService";

export function LinkDialog() {
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
  } = useContext(LinkContext);

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

    if (formData.LowerLayers._value.trim()) {
      const response = await new EthernetLinkService().update(
        device._id,
        formData
      );
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Change Link",
        });
        setIsLoading(false);
        setRefresh(true);
        setDialog(false);
        setFormData(emptyLink);
      }
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
      <InterfaceInput />
    </Dialog>
  );
}
