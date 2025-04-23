import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./ssid";
import { RadioParser } from "../radio/Radio.parser";

export class SSIDParser {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const ssid = this.device.Device.WiFi.SSID;
    const ids = Object.keys(ssid).filter((v) => !v.includes("_"));
    const result = ids
      .map((id): Data => {
        const key = Number(id);

        return {
          ...ssid[key],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.WiFi.SSID.${key}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
        };
      })
      .sort((a, b) => {
        const aName = a.SSID._value.toLowerCase();
        const bName = b.SSID._value.toLowerCase();
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
      };
    });

    return tables;
  }

  private parseEnable(ssid: Data): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (ssid.Enable._value) {
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

  getHardwareName(Id: MenuString): string | undefined {
    const ssid = this.findById(Id);
    if (ssid) {
      const radio = new RadioParser(this.device).getHardwareName(
        ssid.LowerLayers
      );
      if (radio) {
        return radio;
      }
    }
  }
}
