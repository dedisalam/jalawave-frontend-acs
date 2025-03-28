"use client";

import { emptyAddressList } from "@/data/addresslist";
import { DeviceObjectMikrotik } from "@/types/genieacs";
import { AddressListRow } from "@/types/mikrotik/addresslist";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useState } from "react";
import ipaddr from "ipaddr.js";
import { DeviceService } from "@/service/DeviceService";
import { Toast } from "primereact/toast";

interface DialogAddressListProps {
  stateDialog: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  setRequery: React.Dispatch<React.SetStateAction<boolean>>;
  stateData: [
    AddressListRow,
    React.Dispatch<React.SetStateAction<AddressListRow>>
  ];
  device: DeviceObjectMikrotik;
  toast: React.RefObject<Toast | null>;
}

export function DialogAddressList({
  stateDialog,
  stateData,
  setRequery,
  device,
  toast,
}: DialogAddressListProps) {
  const [submitted, setSubmitted] = useState(false);

  const hideDialog = () => {
    setSubmitted(false);
    stateDialog[1](false);
  };

  const saveIP = () => {
    setSubmitted(true);

    if (stateData[0].value.CIDR._value.trim()) {
      const cidr = stateData[0].value.CIDR._value;
      if (ipaddr.IPv4.isValidCIDR(cidr)) {
        const parseCIDR = ipaddr.IPv4.parseCIDR(cidr);
        const ip = parseCIDR[0].toNormalizedString();
        const subnetmask = ipaddr.IPv4.subnetMaskFromPrefixLength(
          parseCIDR[1]
        ).toNormalizedString();
        const parameters = [
          [
            `${stateData[0].key}.IPAddress`,
            ip,
            stateData[0].value.IPAddress._type,
          ],
          [
            `${stateData[0].key}.SubnetMask`,
            subnetmask,
            stateData[0].value.SubnetMask._type,
          ],
        ];

        const deviceID = encodeURIComponent(device._id);
        DeviceService.setParameterValues(deviceID, parameters)
          .then(() => {
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Success Change IP",
            });
            setRequery(true);
          })
          .catch(() => {
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "Error Change IP",
            });
          });

        setRequery(false);
        stateDialog[1](false);
        stateData[1](emptyAddressList);
      }
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = (e.target && e.target.value) || "";
    const _IP = {
      ...stateData[0],
      value: {
        ...stateData[0].value,
        CIDR: {
          ...stateData[0].value.CIDR,
          _value: val,
        },
      },
    };

    stateData[1](_IP);
  };

  const IPDialogFooter = () => {
    if (stateData[0].value.AddressingType._value === "Static") {
      return (
        <>
          <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
          <Button label="Save" icon="pi pi-check" text onClick={saveIP} />
        </>
      );
    }
  };

  return (
    <Dialog
      visible={stateDialog[0]}
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
          value={stateData[0].value.CIDR._value}
          disabled={stateData[0].value.AddressingType._value !== "Static"}
          onChange={(e) => onInputChange(e)}
          required
          autoFocus
          className={classNames({
            "p-invalid":
              submitted &&
              (!stateData[0].value.CIDR._value ||
                !ipaddr.IPv4.isValidCIDR(stateData[0].value.CIDR._value)),
          })}
        />
        {submitted && !stateData[0].value.CIDR._value && (
          <small className="p-invalid">IP is required.</small>
        )}
        {submitted &&
          !ipaddr.IPv4.isValidCIDR(stateData[0].value.CIDR._value) && (
            <small className="p-invalid">Format IP is not valid</small>
          )}
      </div>
    </Dialog>
  );
}
