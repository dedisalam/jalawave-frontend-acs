"use client";

import React, { useContext } from "react";
import { AddressContext } from "@/components/Device/mikrotik/ip/address/Address.context";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
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
    const ipInterface = new IpInterface(device).findById(Id);
    if (!ipInterface) {
      return "";
    }
    const lowerLayers = ipInterface.LowerLayers._value;
    const isGeneric = lowerLayers.includes(
      "Device.X_MIKROTIK_Interface.Generic"
    );
    const isLink = lowerLayers.includes("Device.Ethernet.Link");

    if (isGeneric) {
      const generic = new Generic(device).findById(ipInterface.LowerLayers);
      if (!generic) {
        return "";
      }
      return generic.Name._value;
    }

    if (isLink) {
      const link = new Link(device).findById(ipInterface.LowerLayers);
      if (!link) {
        return "";
      }

      const lowerLayer2 = link.LowerLayers._value;
      const isRadio = lowerLayer2.includes("Device.WiFi.Radio");
      const isEthernet = lowerLayer2.includes("Device.Ethernet.Interface");
      if (isRadio) {
        const radio = new Radio(device).findById(link.LowerLayers);
        if (!radio) {
          return "";
        }
        return radio.Id._value;
      }

      if (isEthernet) {
        const ethernet = new Interface(device).findById(link.LowerLayers);
        if (!ethernet) {
          return "";
        }
        return ethernet.X_MIKROTIK_Name._value;
      }
    }

    return "";
  };

  const findAll = (): {
    id: string;
    name: string;
  }[] => {
    const ipInterfaces = new IpInterface(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: nameIPInterface(Id),
        };
      });

    const selected = new IpInterface(device).findById(formData.Id);
    if (selected && selected.LowerLayers._value !== "") {
      ipInterfaces.push({
        id: selected.LowerLayers._value,
        name: nameIPInterface(selected.LowerLayers),
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
          id: formData.IPInterface._value,
          name: nameIPInterface(formData.IPInterface),
        }}
        onChange={onChange}
        options={findAll()}
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
