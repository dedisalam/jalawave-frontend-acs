"use client";

import { classNames } from "primereact/utils";
import React, { ChangeEvent, useContext } from "react";
import { InterfaceContext } from "../Interface.context";
import { InputText } from "primereact/inputtext";

export function StatusInput() {
  const { formData, submitted, setFormData } = useContext(InterfaceContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.Status._value,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        Status: {
          ...data.Status,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="Status">Status</label>
      <InputText
        value={formData.Status._value}
        onChange={onChange}
        required
        autoFocus
        className={classNameInvalid()}
        disabled={!formData.Status._writable}
        name="Status"
      />
      {submitted && !formData.Status._value && (
        <small className="p-error">Status is not valid.</small>
      )}
    </div>
  );
}
