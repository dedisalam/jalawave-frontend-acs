"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InterfaceContext } from "../Interface.context";
import { GenericParser } from "../../../X_MIKROTIK_Interface/generic/Generic.parser";
import { LinkParser } from "../../../ethernet/link/Link.parser";
import { InterfaceParser } from "../Interface.parser";

export function LowerLayersInput() {
  const { device } = useContext(MikrotikContext);
  const { formData, submitted, setFormData } = useContext(InterfaceContext);

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
    const link = new LinkParser(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: new LinkParser(device).getHardwareName(Id) || "",
        };
      });

    const generic = new GenericParser(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: new GenericParser(device).getHardwareName(Id) || "",
        };
      });

    const linkGeneric = [link, generic]
      .flat()
      .filter(({ id }) => {
        const ethlink = new InterfaceParser(device).findById({
          _object: false,
          _type: "xsd:string",
          _value: id,
        });
        if (!ethlink) {
          return true;
        }
        return false;
      })
      .filter(({ id }) => {
        const ethernetLink = new LinkParser(device).findByLowerLayers({
          _object: false,
          _type: "xsd:string",
          _value: id,
        });
        if (ethernetLink && ethernetLink.Enable._value) {
          return true;
        }
        return false;
      });

    const selected = new InterfaceParser(device).findById(formData.Id);
    if (selected && selected.LowerLayers._value !== "") {
      linkGeneric.push({
        id: selected.LowerLayers._value,
        name: new InterfaceParser(device).getHardwareName(selected.Id) || "",
      });
    }

    return linkGeneric.sort((a, b) => {
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
      <label htmlFor="link / interface generic">Link / Interface Generic</label>
      <Dropdown
        value={{
          id: formData.LowerLayers._value,
          name: new InterfaceParser(device).getHardwareName(formData.Id) || "",
        }}
        onChange={onChange}
        options={findAll()}
        optionLabel="name"
        placeholder="Select Link / Interface Generic"
        className={classNameInvalid()}
      />
    </div>
  );
}
