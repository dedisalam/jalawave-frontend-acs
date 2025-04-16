"use client";

import React, { useContext } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { AddressContext } from "../Address.context";

export function EnableInput() {
  const { formData, setFormData } = useContext(AddressContext);

  const onChange = (e: DropdownChangeEvent) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        Enable: {
          ...data.Enable,
          _value: val,
        },
      };
    });
  };

  const isDynamic = formData.AddressingType._value === "X_MIKROTIK_Dynamic";

  return (
    <div className="field">
      <label htmlFor="enable" className="block mb-2">
        Enable
      </label>
      <InputSwitch
        disabled={isDynamic}
        checked={formData.Enable._value}
        onChange={onChange}
      />
    </div>
  );
}
