"use client";

import React, { useContext } from "react";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import { classNames } from "primereact/utils";
import { MikrotikContext } from "../../../Mikrotik.context";
import { InterfaceParser } from "../../interface/Interface.parser";

export function IPInterfaceInput() {
  const { device } = useContext(MikrotikContext);
  const { formData, setFormData, submitted } = useContext(AddressContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.Id._value,
    });
  };

  const onChange = (e: DropdownChangeEvent) => {
    const val: { id: string; name: string } = e.target && e.target.value;

    setFormData((data) => {
      return {
        ...data,
        Id: {
          ...data.Id,
          _value: val.id,
        },
      };
    });
  };

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const findAll = (): {
    id: string;
    name: string;
  }[] => {
    const ipInterfaces = new InterfaceParser(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: new InterfaceParser(device).getHardwareName(Id) || "",
        };
      });

    const selected = new InterfaceParser(device).findById(formData.Id);
    if (selected && selected.LowerLayers._value !== "") {
      ipInterfaces.push({
        id: selected.LowerLayers._value,
        name:
          new InterfaceParser(device).getHardwareName(selected.LowerLayers) ||
          "",
      });
    }

    return ipInterfaces.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div className="field">
      <label htmlFor="ip">Interface</label>
      <Dropdown
        value={{
          id: formData.Id._value,
          name: new InterfaceParser(device).getHardwareName(formData.Id) || "",
        }}
        onChange={onChange}
        options={findAll()}
        optionLabel="name"
        placeholder="Select Interface"
        className={classNameInvalid()}
      />
      {submitted && !formData.Id._value && (
        <small className="p-error">Interface is Required.</small>
      )}
    </div>
  );
}
