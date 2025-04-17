"use client";

import { classNames } from "primereact/utils";
import React, { useContext } from "react";
import { LinkContext } from "../Link.context";
import { Mikrotik } from "@/service/parser/Mikrotik";
import { MikrotikContext } from "../../../Mikrotik.context";
import { Skeleton } from "primereact/skeleton";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MenuString } from "@/types/genieacs/base";

export function SSIDEthernetInput() {
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

  const nameSSID = (Id: MenuString): string | undefined => {
    const mikrotik = new Mikrotik(device);
    const SSID = mikrotik.findByIdWiFiSSIDV2(Id);
    if (SSID) {
      return SSID.SSID._value;
    }
  };

  const nameEthernet = (Id: MenuString): string | undefined => {
    const mikrotik = new Mikrotik(device);
    const Ethernet = mikrotik.findByIdEthernetInterfaceV2(Id);
    if (Ethernet) {
      return Ethernet.X_MIKROTIK_Name._value;
    }
  };

  const name = (Id: MenuString): string => {
    if (Id._value.includes("Device.WiFi.SSID")) {
      return nameSSID(Id) || "";
    }

    if (Id._value.includes("Device.Ethernet.Interface")) {
      return nameEthernet(Id) || "";
    }

    return "";
  };

  const findAll = (): {
    id: string;
    name: string;
  }[] => {
    const mikrotik = new Mikrotik(device);

    const ssid = mikrotik
      .findAllWiFiSSID()
      .map(({ Id, SSID }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: SSID._value,
        };
      });

    const ethernet = mikrotik
      .findAllEthernetInterface()
      .map(({ Id, X_MIKROTIK_Name }): { id: string; name: string } => {
        return {
          id: Id._value,
          name: X_MIKROTIK_Name._value,
        };
      });

    const etherssid = [ssid, ethernet].flat().filter(({ id }) => {
      const ethlink = mikrotik.findByLowerLayersEthernetLink({
        _object: false,
        _type: "xsd:string",
        _value: id,
      });
      if (!ethlink) {
        return true;
      }
      return false;
    });

    const selected = mikrotik.findByIdEthernetLinkV2(formData.Id);
    if (selected && selected.LowerLayers._value !== "") {
      etherssid.push({
        id: selected.LowerLayers._value,
        name: name(selected.LowerLayers),
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
      <label htmlFor="ssid">SSID / Ethernet</label>
      <Dropdown
        value={{
          id: formData.LowerLayers._value,
          name: name(formData.LowerLayers),
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
