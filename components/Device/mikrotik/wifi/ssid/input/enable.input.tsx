"use client";

import React, { useContext } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { SSIDContext } from "../ssid.context";

export function EnableInput() {
  const { formData, setFormData } = useContext(SSIDContext);

  const onChange = (e: DropdownChangeEvent) => {
    const val = e.target && e.target.value;

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

  return (
    <div className="field">
      <label htmlFor="enable" className="block mb-2">
        Enable
      </label>
      <InputSwitch
        checked={formData.Enable._value}
        onChange={onChange}
        disabled={true}
      />
    </div>
  );
}
