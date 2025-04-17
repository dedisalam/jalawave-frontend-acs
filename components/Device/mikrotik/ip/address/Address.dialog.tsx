"use client";

import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
import { Button } from "primereact/button";
import { IPInput } from "./input/ip.input";
import { MikrotikContext } from "../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import * as ipaddr from "ipaddr.js";
import { emptyIPAddress } from "@/service/data/ip/address";
import { LayoutContext } from "@/components/layout/context/layoutcontext";
import { EnableInput } from "./input/enable.input";
import { IPAddressService } from "@/service/IPAddressService";

export function AddressDialog() {
  const { toast } = useContext(LayoutContext);
  const { device, setRefresh } = useContext(MikrotikContext);
  const {
    dialog,
    dialogHeader,
    setSubmitted,
    setDialog,
    formData,
    setFormData,
    isLoading,
    setIsLoading,
  } = useContext(AddressContext);

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

    if (formData.CIDR._value.trim()) {
      if (ipaddr.IPv4.isValidCIDR(formData.CIDR._value)) {
        const response = await new IPAddressService().update(
          device._id,
          formData.IPInterface,
          formData
        );
        if (response.status === 200) {
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Success Change IP Address",
          });

          setIsLoading(false);
          setRefresh(true);
          setDialog(false);
          setFormData(emptyIPAddress);
        } else {
          toast.current?.show({
            severity: "danger",
            summary: "Error",
            detail: `Error ${response.status} Code`,
          });
        }
      }
    }
  };

  const Footer = () => {
    if (formData.AddressingType._value === "Static") {
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
      <EnableInput />
      <IPInput />
    </Dialog>
  );
}
