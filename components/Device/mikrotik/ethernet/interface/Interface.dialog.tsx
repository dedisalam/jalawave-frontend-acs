"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { Button } from "primereact/button";
import { NameInput } from "./input/name.input";
import { Skeleton } from "primereact/skeleton";
import { MikrotikContext } from "../../Mikrotik.context";
import { InterfaceContext } from "./Interface.context";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { EnableInput } from "./input/enable.input";
import { CurrentBitRateInput } from "./input/curBitRate.input";
import { MACAddressInput } from "./input/macAddress.input";
import { StatusInput } from "./input/status.input";
import { CommentInput } from "./input/comment.input";
import { LinkDownsInput } from "./input/linkDowns.input";
import { InterfaceService } from "./Interface.service";
import { emptyData } from "./Interface.data";

export function InterfaceDialog() {
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
  } = useContext(InterfaceContext);

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

    if (formData.X_MIKROTIK_Name._value.trim()) {
      const response = await new InterfaceService().update(
        device._id,
        formData
      );
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Change Ethernet Interface",
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
      <NameInput />
      <CommentInput />
      <CurrentBitRateInput />
      <MACAddressInput />
      <StatusInput />
      <LinkDownsInput />
    </Dialog>
  );
}
