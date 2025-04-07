"use client";

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import ipaddr from "ipaddr.js";
import { AddressListContext } from "@/components/Device/mikrotik/address-list/Address-list.context";

export function AddressListIPInput() {
  const { data, submitted, setData } = useContext(AddressListContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid":
        submitted &&
        (!data.value.CIDR._value ||
          !ipaddr.IPv4.isValidCIDR(data.value.CIDR._value)),
    });
  };

  const isDisabled = () => {
    return data.value.AddressingType._value !== "Static";
  };

  const isCIDR = () => {
    return submitted && !ipaddr.IPv4.isValidCIDR(data.value.CIDR._value);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = (e.target && e.target.value) || "";
    const _IP = {
      ...data,
      value: {
        ...data.value,
        CIDR: {
          ...data.value.CIDR,
          _value: val,
        },
      },
    };

    setData(_IP);
  };

  return (
    <div className="field">
      <label htmlFor="ip">IP</label>
      <InputText
        value={data.value.CIDR._value}
        disabled={isDisabled()}
        onChange={onChange}
        required
        autoFocus
        className={classNameInvalid()}
      />
      {isCIDR() && <small className="p-invalid">Format IP is not valid.</small>}
    </div>
  );
}
