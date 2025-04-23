import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./Link";
import { InterfaceParser } from "../interface/Interface.parser";
import { SSIDParser } from "../../wifi/ssid/ssid.parser";

export class LinkParser {
  private device: DeviceObjectMikrotik;
  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const link = this.device.Device.Ethernet.Link;
    const ids = Object.keys(link).filter((v) => !v.includes("_"));
    const result = ids
      .map((id): Data => {
        const key = Number(id);
        return {
          ...link[key],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.Ethernet.Link.${key}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
        };
      })
      .sort((a, b) => {
        const aName = a.Id._value.toLowerCase();
        const bName = b.Id._value.toLowerCase();
        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }
        return 0;
      });

    return result;
  }

  findById(id: MenuString): Data | undefined {
    const data = this.findAll().find(({ Id }) => Id._value === id._value);

    return data;
  }

  findEmpty(): Data | undefined {
    const data = this.findAll().find(
      ({ Enable, LowerLayers }) =>
        Enable._value === false && LowerLayers._value === ""
    );

    return data;
  }

  findByLowerLayers(lowerLayers: MenuString): Data | undefined {
    const data = this.findAll().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }

  getTables(): Table[] {
    const tables = this.findAll().map((item): Table => {
      return {
        ...item,
        Enable: this.parseEnable(item),
        Hardware: this.parseHardware(item),
      };
    });

    return tables;
  }

  private parseEnable(link: Data): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (link.Enable._value) {
      Enable = {
        ...Enable,
        _value: "Enabled",
      };
    } else {
      Enable = {
        ...Enable,
        _value: "Disabled",
      };
    }

    return Enable;
  }

  private parseHardware(link: Data): MenuString {
    const Hardware: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: this.getHardwareName(link.Id) || "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    return Hardware;
  }

  getHardwareName(Id: MenuString): string | undefined {
    const link = this.findById(Id);
    if (link) {
      const ssid = new SSIDParser(this.device).getHardwareName(
        link.LowerLayers
      );
      if (ssid) {
        return ssid;
      }

      const ethernet = new InterfaceParser(this.device).getHardwareName(
        link.LowerLayers
      );
      if (ethernet) {
        return ethernet;
      }
    }
  }
}
