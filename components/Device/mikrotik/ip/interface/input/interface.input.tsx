"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MenuString } from "@/types/genieacs/base";
import { InterfaceContext } from "../Interface.context";
import { Link } from "@/service/parser/mikrotik/ethernet/link";
import { Interface as IpInterface } from "@/service/parser/mikrotik/ip/interface";
import { SSID } from "@/service/parser/mikrotik/wifi/ssid";

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
    const generic = new Generic(device).findById(Id);
    if (!generic) {
      return "";
    }

    return generic.Name._value;
  };

  const nameLink = (Id: MenuString): string => {
    const ethernetLink = new Link(device).findById(Id);
    if (!ethernetLink) {
      return "";
    }
    const lowerLayers = ethernetLink.LowerLayers._value;
    const isSSID = lowerLayers.includes("Device.WiFi.SSID");
    if (isSSID) {
      const ssid = new SSID(device).findById(ethernetLink.LowerLayers);
      if (!ssid) {
        return "";
      }
      const isRadio = ssid.LowerLayers._value.includes("Device.WiFi.Radio");
      if (isRadio) {
        const radio = new Radio(device).findById(ssid.LowerLayers);
        if (!radio) {
          return "";
        }
        const ids = radio.Id._value.split(".");
        return `wlan${ids[ids.length - 1]}`;
      }
    }
    const isEthernet = lowerLayers.includes("Device.Ethernet.Interface");
    if (isEthernet) {
      const ethernet = new Interface(device).findById(ethernetLink.LowerLayers);
      if (!ethernet) {
        return "";
      }
      return ethernet.X_MIKROTIK_Name._value;
    }

    return "";
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
    const link = new Link(device)
      .findAll()
      .map(({ Id }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: nameLink(Id),
        };
      });

    const generic = new Generic(device)
      .findAll()
      .map(({ Id, Name }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: Name._value,
        };
      });

    const linkGeneric = [link, generic]
      .flat()
      .filter(({ id }) => {
        const ethlink = new IpInterface(device).findById({
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
        const ethernetLink = new Link(device).findById({
          _object: false,
          _type: "xsd:string",
          _value: id,
        });
        if (ethernetLink && ethernetLink.Enable._value) {
          return true;
        }
        return false;
      });

    const selected = new IpInterface(device).findById(formData.Id);
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
