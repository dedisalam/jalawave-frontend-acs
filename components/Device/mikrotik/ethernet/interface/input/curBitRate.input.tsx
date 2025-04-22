"use client";

import React, { useContext } from "react";
import { InterfaceContext } from "../Interface.context";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";

export function CurrentBitRateInput() {
  const { formData, setFormData } = useContext(InterfaceContext);

  const onChange = (e: InputNumberChangeEvent) => {
    const val = e.value || 0;

    setFormData((data) => {
      return {
        ...data,
        CurrentBitRate: {
          ...data.CurrentBitRate,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="Current Bit Rate">Current Bit Rate</label>
      <InputNumber
        value={formData.CurrentBitRate._value}
        onChange={onChange}
        required
        autoFocus
        disabled={!formData.CurrentBitRate._writable}
        name="Current Bit Rate"
      />
    </div>
  );
}
