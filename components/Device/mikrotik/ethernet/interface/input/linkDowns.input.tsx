"use client";

import React, { useContext } from "react";
import { InterfaceContext } from "../Interface.context";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";

export function LinkDownsInput() {
  const { formData, setFormData } = useContext(InterfaceContext);

  const onChange = (e: InputNumberChangeEvent) => {
    const val = e.value || 0;

    setFormData((data) => {
      return {
        ...data,
        X_MIKROTIK_LinkDowns: {
          ...data.X_MIKROTIK_LinkDowns,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="Link Downs">Link Downs</label>
      <InputNumber
        value={formData.X_MIKROTIK_LinkDowns._value}
        onChange={onChange}
        required
        autoFocus
        disabled={!formData.X_MIKROTIK_LinkDowns._writable}
        name="Link Downs"
      />
    </div>
  );
}
