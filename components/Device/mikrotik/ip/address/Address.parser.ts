import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { Data, Table } from "./Address";
import * as ipaddr from "ipaddr.js";

export class AddressParser {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): Data[] {
    const Interfaces = this.device.Device.IP.Interface;
    const Ids = Object.keys(Interfaces).filter((v) => !v.includes("_"));
    const result = Ids.map((id): Data[] => {
      const key = Number(id);
      const IPv4Address = Interfaces[key].IPv4Address;
      const Ids2 = Object.keys(IPv4Address).filter((v) => !v.includes("_"));

      const result = Ids2.map((id2): Data => {
        const key2 = Number(id2);

        return {
          ...IPv4Address[key2],
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.IP.Interface.${key}.IPv4Address.${key2}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
        };
      });

      return result;
    })
      .flat()
      .sort((a, b) => {
        const aName = a.IPAddress._value.toLowerCase();
        const bName = b.IPAddress._value.toLowerCase();
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

  getTables(): Table[] {
    const tables = this.findAll().map((item): Table => {
      return {
        ...item,
        Enable: this.parseEnable(item),
        AddressingType: this.parseAddressingType(item),
        CIDR: this.parseCIDR(item),
      };
    });

    return tables;
  }

  private parseEnable(address: Data): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (address.Enable._value) {
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

  private parseAddressingType(address: Data): MenuString {
    let AddressingType: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (address.AddressingType._value === "X_MIKROTIK_Dynamic") {
      AddressingType = {
        ...AddressingType,
        _value: "D",
      };
    }

    return AddressingType;
  }

  private parseCIDR(address: Data): MenuString {
    const ip = ipaddr.IPv4.parse(address.SubnetMask._value);

    const CIDR: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: ip.toNormalizedString(),
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    return CIDR;
  }
}
