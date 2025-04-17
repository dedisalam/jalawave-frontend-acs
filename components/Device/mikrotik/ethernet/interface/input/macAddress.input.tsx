"use client";

import { classNames } from "primereact/utils";
import React, { ChangeEvent, useContext } from "react";
import { InterfaceContext } from "../Interface.context";
import { InputText } from "primereact/inputtext";

export function MACAddressInput() {
  const { formData, submitted, setFormData } = useContext(InterfaceContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.MACAddress._value,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        MACAddress: {
          ...data.MACAddress,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="MAC Address">MAC Address</label>
      <InputText
        value={formData.MACAddress._value}
        onChange={onChange}
        required
        autoFocus
        className={classNameInvalid()}
        disabled={!formData.MACAddress._writable}
        name="MAC Address"
      />
      {submitted && !formData.MACAddress._value && (
        <small className="p-error">MAC Address is not valid.</small>
      )}
    </div>
  );
}
