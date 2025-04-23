"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { SSIDContext } from "../ssid.context";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { RadioParser } from "../../radio/Radio.parser";
import { SSIDParser } from "../ssid.parser";

export function LowerLayersInput() {
  const { device } = useContext(MikrotikContext);
  const { formData, submitted, setFormData } = useContext(SSIDContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.SSID._value,
    });
  };

  const onChange = (e: DropdownChangeEvent) => {
    const val = e.target && e.target.value;

    setFormData((data) => {
      return {
        ...data,
        LowerLayers: {
          ...data.LowerLayers,
          _value: val.id,
        },
      };
    });
  };

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const findAllRadio = (): {
    id: string;
    name: string;
  }[] => {
    const radio = new RadioParser(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: new RadioParser(device).getHardwareName(Id) || "",
        };
      });

    return radio;
  };

  return (
    <div className="field">
      <label htmlFor="ssid">Interface</label>
      <Dropdown
        value={{
          id: formData.LowerLayers._value,
          name: new SSIDParser(device).getHardwareName(formData.Id) || "",
        }}
        onChange={onChange}
        options={findAllRadio()}
        optionLabel="name"
        placeholder="Select Interface"
        className={classNameInvalid()}
      />
    </div>
  );
}
