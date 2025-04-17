"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MenuString } from "@/types/genieacs/base";
import { InterfaceContext } from "../Interface.context";

export function InterfaceInput() {
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

  const nameGeneric = (Id: MenuString): string => {
    const generic = new Mikrotik(device).findByIdInterfaceGenericV2(Id);
    if (!generic) {
      return "";
    }

    return generic.Name._value;
  };

  const nameLink = (Id: MenuString): string => {
    const ids = Id._value.split(".");
    const id = ids[ids.length - 1];

    return `Link ${id}`;
  };

  const name = (Id: MenuString): string => {
    if (Id._value.includes("Device.Ethernet.Link")) {
      return nameLink(Id);
    }

    if (Id._value.includes("Device.X_MIKROTIK_Interface.Generic")) {
      return nameGeneric(Id);
    }

    return "";
  };

  const findAll = (): {
    id: string;
    name: string;
  }[] => {
    const mikrotik = new Mikrotik(device);

    const link = mikrotik
      .findAllEthernetLink()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: nameLink(Id),
        };
      });

    const generic = mikrotik
      .findAllInterfaceGeneric()
      .map(({ Id, Name }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: Name._value,
        };
      });

    const linkGeneric = [link, generic]
      .flat()
      .filter(({ id }) => {
        const ethlink = mikrotik.findByLowerLayersIPInterface({
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
        const ethernetLink = mikrotik.findByIdEthernetLinkV2({
          _object: false,
          _type: "xsd:string",
          _value: id,
        });
        if (ethernetLink && ethernetLink.Enable._value) {
          return true;
        }
        return false;
      });

    const selected = mikrotik.findByIdIPInterfaceV2(formData.Id);
    if (selected && selected.LowerLayers._value !== "") {
      linkGeneric.push({
        id: selected.LowerLayers._value,
        name: name(selected.LowerLayers),
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
          name: name(formData.LowerLayers),
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
