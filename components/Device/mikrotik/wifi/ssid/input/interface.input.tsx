"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { SSIDContext } from "../ssid.context";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MenuString } from "@/types/genieacs/base";

export function InterfaceInput() {
  const { device } = useContext(MikrotikContext);
  const { formData, submitted, setFormData } = useContext(SSIDContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.SSID._value,
    });
  };

  const onChange = (e: DropdownChangeEvent) => {
    const val = (e.target && e.target.value) || "";

    setFormData((data) => {
      return {
        ...data,
        LowerLayers: {
          ...data.LowerLayers,
          _value: val,
        },
      };
    });
  };

  if (!device) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const nameRadio = (Id: MenuString): string => {
    const ids = Id._value.split(".");
    const id = ids[ids.length - 1];

    return `wlan${id}`;
  };

  const findAllRadio = (): {
    id: string;
    name: string;
  }[] => {
    const mikrotik = new Mikrotik(device);

    const radio = mikrotik
      .findAllWiFiRadio()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: nameRadio(Id),
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
          name: nameRadio(formData.LowerLayers),
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
