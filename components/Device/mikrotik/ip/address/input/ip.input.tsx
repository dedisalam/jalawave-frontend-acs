"use client";

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import ipaddr from "ipaddr.js";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";

export function IPInput() {
  const { formData, submitted, setFormData, setIsLoading } =
    useContext(AddressContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid":
        submitted &&
        (!formData.CIDR._value ||
          !ipaddr.IPv4.isValidCIDR(formData.CIDR._value)),
    });
  };

  const isDisabled = () => {
    return formData.AddressingType._value !== "Static";
  };

  const isCIDR = () => {
    return submitted && !ipaddr.IPv4.isValidCIDR(formData.CIDR._value);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsLoading(false);
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        CIDR: {
          ...data.CIDR,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="ip">IP</label>
      <InputText
        value={formData.CIDR._value}
        disabled={isDisabled()}
        onChange={onChange}
        required
        autoFocus
        className={classNameInvalid()}
      />
      {isCIDR() && <small className="p-error">Format IP is not valid.</small>}
    </div>
  );
}
