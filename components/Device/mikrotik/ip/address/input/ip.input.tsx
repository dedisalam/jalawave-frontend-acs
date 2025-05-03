"use client";

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import ipaddr from "ipaddr.js";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";

export function IPInput() {
  const { formData, submitted, setFormData, setIsLoading } =
    useContext(AddressContext);

  const [inputValue, setInputValue] = useState<string>("");

  const prefix = ipaddr.IPv4.parse(
    formData.SubnetMask._value
  ).prefixLengthFromSubnetMask();

  useEffect(() => {
    if (prefix === 0) {
      setInputValue(`${formData.IPAddress._value}`);
    } else {
      setInputValue(`${formData.IPAddress._value}/${prefix}`);
    }
  }, [formData.IPAddress._value, prefix]);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid":
        submitted &&
        (!formData.IPAddress._value ||
          !formData.SubnetMask._value ||
          !ipaddr.IPv4.isValidCIDR(inputValue)),
    });
  };

  const isDisabled = () => {
    return formData.AddressingType._value !== "Static";
  };

  const isCIDR = () => {
    return submitted && !ipaddr.IPv4.isValidCIDR(inputValue);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsLoading(false);
    const val = (e.target && e.target.value) || "";

    setInputValue(val);

    const isValidCIDR = ipaddr.IPv4.isValidCIDR(inputValue);
    if (isValidCIDR) {
      const subnetmask = ipaddr.IPv4.subnetMaskFromPrefixLength(
        Number(val.split("/")[1])
      );

      setFormData((data) => {
        return {
          ...data,
          IPAddress: {
            ...data.IPAddress,
            _value: val.split("/")[0],
          },
          SubnetMask: {
            ...data.SubnetMask,
            _value: subnetmask.toNormalizedString(),
          },
        };
      });
    }
  };

  return (
    <div className="field">
      <label htmlFor="ip">IP</label>
      <InputText
        value={inputValue}
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
