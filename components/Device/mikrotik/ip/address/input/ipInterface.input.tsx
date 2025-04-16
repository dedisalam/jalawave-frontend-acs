"use client";

import React, { useContext } from "react";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { Skeleton } from "primereact/skeleton";
import { classNames } from "primereact/utils";
import { MikrotikContext } from "../../../Mikrotik.context";
import { MenuString } from "@/types/genieacs/base";

export function IPInterfaceInput() {
  const { device } = useContext(MikrotikContext);
  const { formData, setFormData, submitted, setIsLoading } =
    useContext(AddressContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.IPInterface._value,
    });
  };

  const onChange = (e: DropdownChangeEvent) => {
    setIsLoading(false);
    const val: { id: string; name: string } = e.target && e.target.value;

    setFormData((data) => {
      return {
        ...data,
        IPInterface: {
          ...data.IPInterface,
          _value: val.id,
        },
      };
    });
  };

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const nameIPInterface = (Id: MenuString): string => {
    const ids = Id._value.split(".");
    const id = ids[ids.length - 1];

    return `IP Interface ${id}`;
  };

  const findAllInterfaceNames = (): {
    id: string;
    name: string;
  }[] => {
    const mikrotik = new Mikrotik(device);

    const ipInterfaces = mikrotik
      .findAllIPInterface()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: nameIPInterface(Id),
        };
      });

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
          id: formData.IPInterface._value,
          name: nameIPInterface(formData.IPInterface),
        }}
        onChange={onChange}
        options={findAllInterfaceNames()}
        optionLabel="name"
        placeholder="Select Interface"
        className={classNameInvalid()}
      />
      {submitted && !formData.IPInterface._value && (
        <small className="p-error">Interface is Required.</small>
      )}
    </div>
  );
}
