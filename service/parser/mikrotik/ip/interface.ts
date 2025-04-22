import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { HWInterface, IPInterface, TBIPInterface } from "@/types/mikrotik";
import { Link } from "../ethernet/link";
import { SSID } from "../wifi/ssid";

export class Interface {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): IPInterface[] {
    const ip = this.device.Device.IP.Interface;
    const ids = Object.keys(ip).filter((v) => !v.includes("_"));

    return ids.map((id) => {
      const key = Number(id);
      return {
        Id: {
          _object: false,
          _type: "xsd:string",
          _value: `Device.IP.Interface.${key}`,
          _timestamp: Date.now().toString(),
          _writable: false,
        },
        Enable: ip[key].Enable,
        LowerLayers: ip[key].LowerLayers,
        Status: ip[key].Status,
        IPv4Address: ip[key].IPv4Address,
        IPv4AddressNumberOfEntries: ip[key].IPv4AddressNumberOfEntries,
        Type: ip[key].Type,
        _timestamp: ip[key]._timestamp,
        _object: ip[key]._object,
        _writable: ip[key]._writable,
      };
    });
  }

  findById(id: MenuString): IPInterface | undefined {
    const data = this.findAll().find(({ Id }) => Id._value === id._value);

    return data;
  }

  findByLowerLayers(lowerLayers: MenuString): IPInterface | undefined {
    const data = this.findAll().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }

  getTables(): TBIPInterface[] {
    const tables = this.findAll().map((item): TBIPInterface => {
      return {
        Id: item.Id,
        Enable: this.parseEnable(item),
        Status: item.Status,
        HWInterface: this.findHardware(item),
        IPv4AddressNumberOfEntries: item.IPv4AddressNumberOfEntries,
      };
    });

    return tables.sort((a, b) => {
      if (a.HWInterface.Name._value < b.HWInterface.Name._value) {
        return -1;
      }
      if (a.HWInterface.Name._value > b.HWInterface.Name._value) {
        return 1;
      }
      return 0;
    });
  }

  private parseEnable(ipInterface: IPInterface): MenuString {
    let Enable: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    if (ipInterface.Enable._value) {
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

  findHardware(ipInterface: IPInterface): HWInterface {
    let Id: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };
    let Name: MenuString = {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    };

    const lowerLayers = ipInterface.LowerLayers._value;
    const isGeneric = lowerLayers.includes(
      "Device.X_MIKROTIK_Interface.Generic"
    );
    if (isGeneric) {
      const generic = new Generic(this.device).findById(
        ipInterface.LowerLayers
      );
      if (generic) {
        Id = {
          ...Id,
          _value: generic.Id._value,
        };
        Name = {
          ...Name,
          _value: generic.Name._value,
        };
      }
    }

    const isLink = lowerLayers.includes("Device.Ethernet.Link");
    if (isLink) {
      const link = new Link(this.device).findById(ipInterface.LowerLayers);
      if (link) {
        const lowerLayers2 = link.LowerLayers._value;
        const isSSID = lowerLayers2.includes("Device.WiFi.SSID");
        if (isSSID) {
          const ssid = new SSID(this.device).findById(link.LowerLayers);
          if (ssid) {
            const lowerLayers3 = ssid.LowerLayers._value;
            const isRadio = lowerLayers3.includes("Device.WiFi.Radio");
            if (isRadio) {
              const radio = new Radio(this.device).findById(ssid.LowerLayers);
              if (radio) {
                const ids = radio.Id._value.split(".");
                const id = ids[ids.length - 1];

                Id = {
                  ...Id,
                  _value: radio.Id._value,
                };
                Name = {
                  ...Name,
                  _value: `wlan${id}`,
                };
              }
            }
          }
        }

        const isEthernet = lowerLayers2.includes("Device.Ethernet.Interface");
        if (isEthernet) {
          const ethernet = new EthernetInterface(this.device).findById(
            link.LowerLayers
          );
          if (ethernet) {
            Id = {
              ...Id,
              _value: ethernet.Id._value,
            };
            Name = {
              ...Name,
              _value: ethernet.X_MIKROTIK_Name._value,
            };
          }
        }
      }
    }

    return {
      Id,
      Name,
    };
  }
}
