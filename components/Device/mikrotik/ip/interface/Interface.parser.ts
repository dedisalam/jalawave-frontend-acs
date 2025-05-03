import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./Interface";
import { LinkParser } from "../../ethernet/link/Link.parser";
import { GenericParser } from "../../X_MIKROTIK_Interface/generic/Generic.parser";

export class InterfaceParser {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const interfaces = this.device.Device.IP.Interface;
    const ids = Object.keys(interfaces).filter((v) => !v.includes("_"));
    const result = ids
      .map((id): Data => {
        const key = Number(id);
        return {
          ...interfaces[key],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.IP.Interface.${key}`,
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

    return tables.sort((a, b) => {
      const aName = a.Hardware._value.toLowerCase();
      const bName = b.Hardware._value.toLowerCase();
      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }
      return 0;
    });
  }

  private parseEnable(Interface: Data): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (Interface.Enable._value) {
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

  private parseHardware(Interface: Data): MenuString {
    const Hardware: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: this.getHardwareName(Interface.Id) || "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    return Hardware;
  }

  getHardwareName(Id: MenuString): string | undefined {
    const Interface = this.findById(Id);
    if (Interface) {
      const link = new LinkParser(this.device).getHardwareName(
        Interface.LowerLayers
      );
      if (link) {
        return link;
      }

      const generic = new GenericParser(this.device).getHardwareName(
        Interface.LowerLayers
      );
      if (generic) {
        return generic;
      }
    }
  }
}
