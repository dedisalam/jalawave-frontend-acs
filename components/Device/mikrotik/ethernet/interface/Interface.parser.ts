import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./Interface";

export class InterfaceParser {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const ethernetInterface = this.device.Device.Ethernet.Interface;
    const ids = Object.keys(ethernetInterface).filter((v) => !v.includes("_"));

    const result = ids
      .map((id): Data => {
        const key = Number(id);

        return {
          ...ethernetInterface[key],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.Ethernet.Interface.${key}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
        };
      })
      .sort((a, b) => {
        if (a.X_MIKROTIK_Name._value < b.X_MIKROTIK_Name._value) return -1;
        if (a.X_MIKROTIK_Name._value > b.X_MIKROTIK_Name._value) return 1;
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

  private parseEnable(ethernetInterface: Table): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (ethernetInterface.Enable._value) {
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
}
