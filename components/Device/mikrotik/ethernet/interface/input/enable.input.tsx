"use client";

import React, { useContext } from "react";
import { DropdownChangeEvent } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InterfaceContext } from "../Interface.context";

export function EnableInput() {
  const { formData, setFormData } = useContext(InterfaceContext);

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
        disabled={!formData.Enable._writable}
      />
    </div>
  );
}
