import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./Generic";

export class GenericParser {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const generic = this.device.Device.X_MIKROTIK_Interface.Generic;
    const ids = Object.keys(generic).filter((v) => !v.includes("_"));
    const result = ids
      .map((id): Data => {
        const key = Number(id);
        return {
          ...generic[key],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.X_MIKROTIK_Interface.Generic.${key}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
        };
      })
      .sort((a, b) => {
        if (a.Name._value < b.Name._value) return -1;
        if (a.Name._value > b.Name._value) return 1;
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
    const generic = this.findById(Id);
    if (generic) {
      return generic.Name._value;
    }
  }
}
