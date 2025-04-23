import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./Radio";

export class RadioParser {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const wifiRadio = this.device.Device.WiFi.Radio;
    const ids = Object.keys(wifiRadio).filter((v) => !v.includes("_"));
    const result = ids
      .map((id): Data => {
        const key = Number(id);

        return {
          ...wifiRadio[key],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.WiFi.Radio.${key}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
        };
      })
      .sort((a, b) => {
        if (a.Id._value < b.Id._value) return -1;
        if (a.Id._value > b.Id._value) return 1;
        return 0;
      });

    return result;
  }

  findById(id: MenuString): Data | undefined {
    const data = this.findAll().find(({ Id }) => Id._value === id._value);

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

  private parseEnable(radio: Data): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (radio.Enable._value) {
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
    const radio = this.findById(Id);
    if (radio) {
      const ids = radio.Id._value.split(".");
      return `wlan${ids[ids.length - 1]}`;
    }
  }
}
