"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { LinkContext } from "../Link.context";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { LinkParser } from "../Link.parser";
import { InterfaceParser } from "../../interface/Interface.parser";
import { SSIDParser } from "../../../wifi/ssid/ssid.parser";

export function LowerLayersInput() {
  const { device } = useContext(MikrotikContext);
  const { formData, submitted, setFormData } = useContext(LinkContext);

  const classNameInvalid = () => {
    return classNames({
      "p-invalid": submitted && !formData.LowerLayers._value,
    });
  };

  const onChange = (e: DropdownChangeEvent) => {
    const val = (e.target && e.target.value) || "";

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

  const findAll = (): {
    id: string;
    name: string;
  }[] => {
    const ssid = new SSIDParser(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: new SSIDParser(device).getHardwareName(Id) || "",
        };
      });

    const ethernet = new InterfaceParser(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: new InterfaceParser(device).getHardwareName(Id) || "",
        };
      });

    const etherssid = [ssid, ethernet].flat().filter(({ id }) => {
      const ethlink = new LinkParser(device).findByLowerLayers({
        _object: false,
        _type: "xsd:string",
        _value: id,
      });
      if (!ethlink) {
        return true;
      }
      return false;
    });

    const selected = new LinkParser(device).findById(formData.Id);
    if (selected && selected.LowerLayers._value !== "") {
      etherssid.push({
        id: selected.LowerLayers._value,
        name: new LinkParser(device).getHardwareName(selected.Id) || "",
      });
    }

    return etherssid.sort((a, b) => {
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
      <label htmlFor="ssid">Interface</label>
      <Dropdown
        value={{
          id: formData.LowerLayers._value,
          name: new LinkParser(device).getHardwareName(formData.Id) || "",
        }}
        onChange={onChange}
        options={findAll()}
        optionLabel="name"
        placeholder="Select Interface"
        className={classNameInvalid()}
      />
    </div>
  );
}
