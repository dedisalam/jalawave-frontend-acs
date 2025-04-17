"use client";

import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { InterfaceContext } from "../Interface.context";

export function NameInput() {
  const { formData, submitted, setFormData } = useContext(InterfaceContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.X_MIKROTIK_Name._value,
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        X_MIKROTIK_Name: {
          ...data.X_MIKROTIK_Name,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="name">Name</label>
      <InputText
        value={formData.X_MIKROTIK_Name._value}
        onChange={onChange}
        required
        autoFocus
        className={classNameInvalid()}
        name="name"
        disabled={!formData.X_MIKROTIK_Name._writable}
      />
      {submitted && !formData.X_MIKROTIK_Name._value && (
        <small className="p-error">Name is not valid.</small>
      )}
    </div>
  );
}
