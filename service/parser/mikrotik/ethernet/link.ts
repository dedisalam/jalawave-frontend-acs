import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { EthernetLink } from "@/types/mikrotik";

export class Link {
  private device: DeviceObjectMikrotik;
  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): EthernetLink[] {
    const link = this.device.Device.Ethernet.Link;
    const ids = Object.keys(link).filter((v) => !v.includes("_"));

    return ids.map((id) => {
      const key = Number(id);
      return {
        Id: {
          _object: false,
          _type: "xsd:string",
          _value: `Device.Ethernet.Link.${key}`,
          _timestamp: Date.now().toString(),
          _writable: false,
        },
        Enable: link[key].Enable,
        LowerLayers: link[key].LowerLayers,
        Status: link[key].Status,
        _timestamp: link[key]._timestamp,
        _object: link[key]._object,
        _writable: link[key]._writable,
      };
    });
  }

  findById(id: MenuString): EthernetLink | undefined {
    const data = this.findAll().find(({ Id }) => Id._value === id._value);

    return data;
  }

  findEmpty(): EthernetLink | undefined {
    const data = this.findAll().find(
      ({ Enable, LowerLayers }) =>
        Enable._value === false && LowerLayers._value === ""
    );

    return data;
  }

  findByLowerLayers(lowerLayers: MenuString): EthernetLink | undefined {
    const data = this.findAll().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }
}
