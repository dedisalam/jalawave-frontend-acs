"use client";

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { SSIDContext } from "../ssid.context";

export function NameInput() {
  const { formData, submitted, setFormData } = useContext(SSIDContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.SSID._value,
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        SSID: {
          ...data.SSID,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="ssid">SSID</label>
      <InputText
        value={formData.SSID._value}
        onChange={onChange}
        required
        autoFocus
        className={classNameInvalid()}
      />
      {submitted && !formData.SSID._value && (
        <small className="p-error">SSID is not valid.</small>
      )}
    </div>
  );
}
