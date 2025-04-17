"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { InterfaceContext } from "../Interface.context";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";

export function CurrentBitRateInput() {
  const { formData, submitted, setFormData } = useContext(InterfaceContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.CurrentBitRate._value,
    });
  };

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
        className={classNameInvalid()}
        disabled={!formData.CurrentBitRate._writable}
        name="Current Bit Rate"
      />
      {submitted && !formData.CurrentBitRate._value && (
        <small className="p-error">Current Bit Rate is not valid.</small>
      )}
    </div>
  );
}
