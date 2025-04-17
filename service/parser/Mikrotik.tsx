import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { AppMenuItem } from "@/types/layout";
import {
  EthernetInterface,
  EthernetLink,
  InterfaceGeneric,
  IPAddress,
  IPInterface,
  WiFiRadio,
  WiFiSSID,
} from "@/types/mikrotik";
import ipaddr from "ipaddr.js";

interface BasicRow {
  field: string;
  value: string | number | boolean;
}

type BasicTable = BasicRow[];

export class Mikrotik {
  private device: DeviceObjectMikrotik;
  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  getMenuItem(): AppMenuItem {
    const deviceID = encodeURIComponent(this.device._id);

    const menu = {
      label: this.device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value,
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Interfaces",
          icon: "pi pi-fw pi-list",
          items: [
            {
              label: "Ethernet",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/interfaces/ethernet`,
            },
            {
              label: "Radio",
              icon: "pi pi-fw pi-wifi",
              to: `/devices/mikrotik/${deviceID}/interfaces/radio`,
            },
            {
              label: "Generic",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/interfaces/generic`,
            },
          ],
        },
        {
          label: "WiFi",
          icon: "pi pi-fw pi-wifi",
          items: [
            {
              label: "SSID",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/wifi/ssid`,
            },
          ],
        },
        {
          label: "Ethernet",
          icon: "pi pi-fw pi-list",
          items: [
            {
              label: "Link",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/ethernet/link`,
            },
          ],
        },
        {
          label: "IP",
          icon: "pi pi-fw pi-desktop",
          items: [
            {
              label: "Interface",
              icon: "pi pi-fw pi-list",
              to: `/devices/mikrotik/${deviceID}/ip/interface`,
            },
            {
              label: "Address",
              icon: "pi pi-fw pi-globe",
              to: `/devices/mikrotik/${deviceID}/ip/address`,
            },
          ],
        },
        {
          label: "System",
          icon: "pi pi-fw pi-cog",
          items: [
            {
              label: "Reboot",
              icon: "pi pi-fw pi-refresh",
              to: `/devices/mikrotik/${deviceID}/system/reboot`,
            },
            {
              label: "Resources",
              icon: "pi pi-fw pi-database",
              to: `/devices/mikrotik/${deviceID}/system/resources`,
            },
          ],
        },
      ],
    };

    return menu;
  }

  getResources(): BasicTable {
    const resources = [] as BasicTable;
    resources.push({
      field: "Uptime",
      value: this.device.Device.DeviceInfo.UpTime._value,
    });
    resources.push({
      field: "Free Memory",
      value: Math.round(
        Number(this.device.Device.DeviceInfo.MemoryStatus.Free._value) / 1024
      ).toPrecision(4),
    });
    resources.push({
      field: "Total Memory",
      value: Math.round(
        Number(this.device.Device.DeviceInfo.MemoryStatus.Total._value) / 1024
      ).toPrecision(4),
    });

    return resources;
  }

  findAllInterfaceGeneric(): InterfaceGeneric[] {
    const generic = this.device.Device.X_MIKROTIK_Interface.Generic;
    const ids = Object.keys(generic).filter((v) => !v.includes("_"));

    return ids.map((id) => {
      const key = Number(id);
      return {
        Id: {
          _object: false,
          _type: "xsd:string",
          _value: `Device.X_MIKROTIK_Interface.Generic.${key}`,
          _timestamp: Date.now().toString(),
          _writable: false,
        },
        Enable: generic[key].Enable,
        LowerLayers: generic[key].LowerLayers,
        Name: generic[key].Name,
        Status: generic[key].Status,
        _timestamp: generic[key]._timestamp,
        _object: generic[key]._object,
        _writable: generic[key]._writable,
      };
    });
  }

  // findByIdInterfaceGeneric(id: string): InterfaceGeneric {
  //   const data = this.findAllInterfaceGeneric().find(
  //     ({ Id }) => Id._value === id
  //   );

  //   if (!data) {
  //     throw new Error(`Interface Generic with id "${id}" not found`);
  //   }

  //   return data;
  // }

  findByIdInterfaceGenericV2(id: MenuString): InterfaceGeneric | undefined {
    const data = this.findAllInterfaceGeneric().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findAllEthernetInterface(): EthernetInterface[] {
    const ethernet = this.device.Device.Ethernet.Interface;
    const ids = Object.keys(ethernet).filter((v) => !v.includes("_"));

    return ids.map((id) => {
      const key = Number(id);
      return {
        Id: {
          _object: false,
          _type: "xsd:string",
          _value: `Device.Ethernet.Interface.${key}`,
          _timestamp: Date.now().toString(),
          _writable: false,
        },
        Enable: ethernet[key].Enable,
        LowerLayers: ethernet[key].LowerLayers,
        Status: ethernet[key].Status,
        CurrentBitRate: ethernet[key].CurrentBitRate,
        MACAddress: ethernet[key].MACAddress,
        Stats: ethernet[key].Stats,
        X_MIKROTIK_Comment: ethernet[key].X_MIKROTIK_Comment,
        X_MIKROTIK_LinkDowns: ethernet[key].X_MIKROTIK_LinkDowns,
        X_MIKROTIK_Name: ethernet[key].X_MIKROTIK_Name,
        _timestamp: ethernet[key]._timestamp,
        _object: ethernet[key]._object,
        _writable: ethernet[key]._writable,
      };
    });
  }

  // findByIdEthernetInterface(id: string): EthernetInterface {
  //   const data = this.findAllEthernetInterface().find(
  //     ({ Id }) => Id._value === id
  //   );

  //   if (!data) {
  //     throw new Error(`Ethernet Interface with id "${id}" not found`);
  //   }

  //   return data;
  // }

  findByIdEthernetInterfaceV2(id: MenuString): EthernetInterface | undefined {
    const data = this.findAllEthernetInterface().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findAllEthernetLink(): EthernetLink[] {
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

  // findByIdEthernetLink(id: string): EthernetLink {
  //   const data = this.findAllEthernetLink().find(({ Id }) => Id._value === id);

  //   if (!data) {
  //     throw new Error(`Ethernet Link with id "${id}" not found`);
  //   }

  //   return data;
  // }

  findByIdEthernetLinkV2(id: MenuString): EthernetLink | undefined {
    const data = this.findAllEthernetLink().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findEmptyEthernetLink(): EthernetLink | undefined {
    const data = this.findAllEthernetLink().find(
      ({ Enable, LowerLayers }) =>
        Enable._value === false && LowerLayers._value === ""
    );

    return data;
  }

  findByLowerLayersEthernetLink(
    lowerLayers: MenuString
  ): EthernetLink | undefined {
    const data = this.findAllEthernetLink().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }

  findAllIPInterface(): IPInterface[] {
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

  // findByIdIPInterface(id: string): IPInterface {
  //   const data = this.findAllIPInterface().find(({ Id }) => Id._value === id);

  //   if (!data) {
  //     throw new Error(`IP Interface with id "${id}" not found`);
  //   }

  //   return data;
  // }

  findByIdIPInterfaceV2(id: MenuString): IPInterface | undefined {
    const data = this.findAllIPInterface().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findByLowerLayersIPInterface(
    lowerLayers: MenuString
  ): IPInterface | undefined {
    const data = this.findAllIPInterface().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }

  findAllIPAddress(): IPAddress[] {
    const IPInterfaces = this.device.Device.IP.Interface;
    const IdInterfaces = Object.keys(IPInterfaces).filter(
      (v) => !v.includes("_")
    );

    return IdInterfaces.map((idInterface) => {
      const IdInterface = Number(idInterface);
      const IPAddresses = IPInterfaces[IdInterface].IPv4Address;
      const IdIPAddresses = Object.keys(IPAddresses).filter(
        (v) => !v.includes("_")
      );

      const result = IdIPAddresses.map((idIPAddress): IPAddress => {
        const IdIPAddress = Number(idIPAddress);

        const prefix = ipaddr.IPv4.parse(
          IPAddresses[IdIPAddress].SubnetMask._value
        ).prefixLengthFromSubnetMask();
        const cidr = `${IPAddresses[IdIPAddress].IPAddress._value}/${prefix}`;
        const network =
          ipaddr.IPv4.networkAddressFromCIDR(cidr).toNormalizedString();
        const IPInterface = this.findByIdIPInterfaceV2({
          _type: "xsd:string",
          _value: `Device.IP.Interface.${IdInterface}`,
          _object: false,
        });

        let IdIPInterface: MenuString = {
          _type: "xsd:string",
          _value: "",
          _object: false,
        };
        let HWInterfaceName: MenuString = {
          _type: "xsd:string",
          _value: "",
          _object: false,
        };
        let HWInterfaceId: MenuString = {
          _type: "xsd:string",
          _value: "",
          _object: false,
        };

        if (IPInterface) {
          IdIPInterface = IPInterface.Id;
          if (IPInterface.LowerLayers._value.includes("Device.Ethernet.Link")) {
            const EthernetLink = this.findByIdEthernetLinkV2(
              IPInterface.LowerLayers
            );

            if (EthernetLink) {
              if (
                EthernetLink.LowerLayers._value.includes("Device.WiFi.SSID")
              ) {
                const WiFiSSID = this.findByIdWiFiSSID(
                  EthernetLink.LowerLayers._value
                );
                const WiFiRadio = this.findByIdWiFiRadio(
                  WiFiSSID.LowerLayers._value
                );
                const ids = WiFiRadio.Id._value.split(".");
                const id = ids[ids.length - 1];

                HWInterfaceId = WiFiRadio.Id;
                HWInterfaceName = { ...WiFiRadio.Id, _value: `wlan${id}` };
              } else {
                const EthernetInterface = this.findByIdEthernetInterfaceV2(
                  EthernetLink.LowerLayers
                );
                if (EthernetInterface) {
                  HWInterfaceId = EthernetInterface.Id;
                  HWInterfaceName = EthernetInterface.X_MIKROTIK_Name;
                }
              }
            }
          } else {
            const InterfaceGeneric = this.findByIdInterfaceGenericV2(
              IPInterface.LowerLayers
            );
            if (InterfaceGeneric) {
              HWInterfaceId = InterfaceGeneric.Id;
              HWInterfaceName = InterfaceGeneric.Name;
            }
          }
        }

        return {
          Id: {
            _object: false,
            _type: "xsd:string",
            _value: `Device.IP.Interface.${IdInterface}.IPv4Address.${IdIPAddress}`,
            _timestamp: Date.now().toString(),
            _writable: false,
          },
          CIDR: {
            _object: false,
            _type: "xsd:string",
            _value: cidr,
            _timestamp: Date.now().toString(),
            _writable: true,
          },
          Network: {
            _object: false,
            _type: "xsd:string",
            _value: network,
            _timestamp: Date.now().toString(),
            _writable: true,
          },
          HWInterface: {
            Id: HWInterfaceId,
            Name: HWInterfaceName,
          },
          IPInterface: IdIPInterface,
          AddressingType: IPAddresses[IdIPAddress].AddressingType,
          Enable: IPAddresses[IdIPAddress].Enable,
          IPAddress: IPAddresses[IdIPAddress].IPAddress,
          Status: IPAddresses[IdIPAddress].Status,
          SubnetMask: IPAddresses[IdIPAddress].SubnetMask,
          _timestamp: IPAddresses[IdIPAddress]._timestamp,
          _object: IPAddresses[IdIPAddress]._object,
          _writable: IPAddresses[IdIPAddress]._writable,
        };
      });

      return result;
    }).flat();
  }

  findByIdIPAddress(id: MenuString): IPAddress | undefined {
    const data = this.findAllIPAddress().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findByIPInterfaceIPAddress(ipInterface: MenuString): IPAddress[] | undefined {
    const data = this.findAllIPAddress().filter(
      ({ IPInterface }) => IPInterface._value === ipInterface._value
    );

    return data;
  }

  findAllWiFiRadio(): WiFiRadio[] {
    const WiFiRadios = this.device.Device.WiFi.Radio;
    const IdWiFiRadios = Object.keys(WiFiRadios).filter(
      (v) => !v.includes("_")
    );

    return IdWiFiRadios.map((idWiFiRadio) => {
      const IdWiFiRadio = Number(idWiFiRadio);

      return {
        Id: {
          _object: false,
          _type: "xsd:string",
          _value: `Device.WiFi.Radio.${IdWiFiRadio}`,
          _timestamp: Date.now().toString(),
          _writable: false,
        },
        Enable: WiFiRadios[IdWiFiRadio].Enable,
        LowerLayers: WiFiRadios[IdWiFiRadio].LowerLayers,
        Status: WiFiRadios[IdWiFiRadio].Status,
        AutoChannelEnable: WiFiRadios[IdWiFiRadio].AutoChannelEnable,
        AutoChannelSupported: WiFiRadios[IdWiFiRadio].AutoChannelSupported,
        Channel: WiFiRadios[IdWiFiRadio].Channel,
        OperatingFrequencyBand: WiFiRadios[IdWiFiRadio].OperatingFrequencyBand,
        OperatingStandards: WiFiRadios[IdWiFiRadio].OperatingStandards,
        PossibleChannels: WiFiRadios[IdWiFiRadio].PossibleChannels,
        Stats: WiFiRadios[IdWiFiRadio].Stats,
        SupportedFrequencyBands:
          WiFiRadios[IdWiFiRadio].SupportedFrequencyBands,
        SupportedStandards: WiFiRadios[IdWiFiRadio].SupportedStandards,
        X_MIKROTIK_Stats: WiFiRadios[IdWiFiRadio].X_MIKROTIK_Stats,
        _timestamp: WiFiRadios[IdWiFiRadio]._timestamp,
        _object: WiFiRadios[IdWiFiRadio]._object,
        _writable: WiFiRadios[IdWiFiRadio]._writable,
      };
    });
  }

  findByIdWiFiRadio(id: string): WiFiRadio {
    const data = this.findAllWiFiRadio().find(({ Id }) => Id._value === id);

    if (!data) {
      throw new Error(`WiFi Radio with id "${id}" not found`);
    }

    return data;
  }

  findByIdWiFiRadioV2(id: MenuString): WiFiRadio | undefined {
    const data = this.findAllWiFiRadio().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findAllWiFiSSID(): WiFiSSID[] {
    const WiFiSSIDs = this.device.Device.WiFi.SSID;
    const IdWiFiSSIDs = Object.keys(WiFiSSIDs).filter((v) => !v.includes("_"));

    return IdWiFiSSIDs.map((idWiFiSSID) => {
      const IdWiFiSSID = Number(idWiFiSSID);

      return {
        Id: {
          _object: false,
          _type: "xsd:string",
          _value: `Device.WiFi.SSID.${IdWiFiSSID}`,
          _timestamp: Date.now().toString(),
          _writable: false,
        },
        Enable: WiFiSSIDs[IdWiFiSSID].Enable,
        LowerLayers: WiFiSSIDs[IdWiFiSSID].LowerLayers,
        Status: WiFiSSIDs[IdWiFiSSID].Status,
        Stats: WiFiSSIDs[IdWiFiSSID].Stats,
        BSSID: WiFiSSIDs[IdWiFiSSID].BSSID,
        MACAddress: WiFiSSIDs[IdWiFiSSID].MACAddress,
        SSID: WiFiSSIDs[IdWiFiSSID].SSID,
        _timestamp: WiFiSSIDs[IdWiFiSSID]._timestamp,
        _object: WiFiSSIDs[IdWiFiSSID]._object,
        _writable: WiFiSSIDs[IdWiFiSSID]._writable,
      };
    });
  }

  findByIdWiFiSSID(id: string): WiFiSSID {
    const data = this.findAllWiFiSSID().find(({ Id }) => Id._value === id);

    if (!data) {
      throw new Error(`WiFi SSID with id "${id}" not found`);
    }

    return data;
  }

  findByIdWiFiSSIDV2(id: MenuString): WiFiSSID | undefined {
    const data = this.findAllWiFiSSID().find(
      ({ Id }) => Id._value === id._value
    );

    return data;
  }

  findByLowerLayersWiFiSSID(lowerLayers: MenuString): WiFiSSID | undefined {
    const data = this.findAllWiFiSSID().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }
}
