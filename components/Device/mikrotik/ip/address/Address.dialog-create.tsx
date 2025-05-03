"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
import { Button } from "primereact/button";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { IPInterfaceInput } from "./input/ipInterface.input";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { AddressService } from "./Address.service";
import { emptyData } from "./Address.data";

export function AddressDialogCreate() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const {
    dialogCreate,
    dialogCreateHeader,
    formData,
    isLoading,
    setDialogCreate,
    setFormData,
    setIsLoading,
    setSubmitted,
  } = useContext(AddressContext);

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const hide = () => {
    setSubmitted(false);
    setDialogCreate(false);
  };

  const save = async () => {
    setSubmitted(true);
    setIsLoading(true);

    if (formData.Id._value.trim()) {
      const response = await new AddressService().create(
        device._id,
        formData.Id
      );
      if (response.status === 200) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Success Change IP Address",
        });

        setSubmitted(false);
        setRefresh(true);
        setDialogCreate(false);
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
      visible={dialogCreate}
      style={{ width: "450px" }}
      header={dialogCreateHeader}
      modal
      className="p-fluid"
      footer={Footer}
      onHide={hide}
    >
      <IPInterfaceInput />
    </Dialog>
  );
}
