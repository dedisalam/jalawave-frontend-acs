"use client";

import React, { ChangeEvent, useContext } from "react";
import { InterfaceContext } from "../Interface.context";
import { InputText } from "primereact/inputtext";

export function CommentInput() {
  const { formData, setFormData } = useContext(InterfaceContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        X_MIKROTIK_Comment: {
          ...data.X_MIKROTIK_Comment,
          _value: val,
        },
      };
    });
  };

  return (
    <div className="field">
      <label htmlFor="Comment">Comment</label>
      <InputText
        value={formData.X_MIKROTIK_Comment._value}
        onChange={onChange}
        autoFocus
        disabled={!formData.X_MIKROTIK_Comment._writable}
        name="Comment"
      />
    </div>
  );
}
