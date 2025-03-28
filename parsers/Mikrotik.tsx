import { DeviceObjectMikrotik } from "@/types/genieacs";
import { ClientMenu } from "@/types/genieacs/dhcpv4/client/clientMenu";
import { InterfaceMenu } from "@/types/genieacs/ethernet/interface/interfaceMenu";
import { LinkMenu } from "@/types/genieacs/ethernet/link/linkMenu";
import { InterfaceMenuMikrotik } from "@/types/genieacs/ip/interface/interfaceMenu";
import { IPv4AddressMenuMikrotik } from "@/types/genieacs/ip/interface/interfaceMenu/ipv4Address/ipv4AddressMenu";
import { GenericMenu } from "@/types/genieacs/x_MIKROTIK_Interface/generic/genericMenu";
import { AppMenuItem } from "@/types/layout";
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

  getInterfaceIPs(): IPv4AddressMenuMikrotik[] {
    const obj1 = this.device.Device.IP.Interface;
    return Object.keys(obj1)
      .filter((val1) => !val1.includes("_"))
      .map((item1) => {
        const key1 = Number(item1);
        const obj2 = this.device.Device.IP.Interface[key1].IPv4Address;
        return Object.keys(obj2)
          .filter((val2) => !val2.includes("_"))
          .map((item2) => {
            const key2 = Number(item2);
            return obj2[key2];
          });
      })
      .flat();
  }

  getActiveInterfaces(): InterfaceMenuMikrotik[] {
    const obj = this.device.Device.IP.Interface;
    return Object.keys(obj)
      .filter((val) => !val.includes("_"))
      .map((item) => {
        const key = Number(item);
        return this.device.Device.IP.Interface[key];
      });
  }

  getDHCPv4IPs(): ClientMenu[] {
    const obj1 = this.device.Device.DHCPv4.Client;
    return Object.keys(obj1)
      .filter((val1) => !val1.includes("_"))
      .map((item1) => {
        const key1 = Number(item1);
        return this.device.Device.DHCPv4.Client[key1];
      });
  }

  getIPs(): {
    interface?: string;
    ip: string;
    network: string;
    flag: string;
  }[] {
    const result = [] as {
      interface?: string;
      ip: string;
      network: string;
      flag: string;
    }[];

    this.getActiveInterfaces().forEach((item) => {
      let interfaceName: string | undefined;
      const llv = item.LowerLayers._value;
      if (llv.includes("Device.Ethernet.Link")) {
        const ll = this.findEthernetLink(llv)?.LowerLayers._value;
        interfaceName = this.findEthernetInterface(ll)?.X_MIKROTIK_Name._value;
      } else if (llv.includes("Device.X_MIKROTIK_Interface.Generic")) {
        interfaceName = this.findInterfaceGeneric(llv)?.Name._value;
      } else {
        interfaceName = this.findEthernetInterface(llv)?.X_MIKROTIK_Name._value;
      }

      Object.keys(item.IPv4Address)
        .filter((val) => !val.includes("_"))
        .forEach((item2) => {
          const key = Number(item2);
          const prefix = ipaddr.IPv4.parse(
            item.IPv4Address[key].SubnetMask._value
          ).prefixLengthFromSubnetMask();
          const CIDR = `${item.IPv4Address[key].IPAddress._value}/${prefix}`;
          const network = ipaddr.IPv4.networkAddressFromCIDR(CIDR);

          result.push({
            flag: item.IPv4Address[key].AddressingType._value,
            interface: interfaceName,
            ip: CIDR,
            network: network.toNormalizedString(),
          });
        });
    });

    return result;
  }

  getEthernetInterface(): { key: string; value: InterfaceMenu }[] {
    return Object.keys(this.device.Device.Ethernet.Interface)
      .filter((val) => !val.includes("_"))
      .map((item) => {
        const key = Number(item);
        return {
          key: `Device.Ethernet.Interface.${key}`,
          value: this.device.Device.Ethernet.Interface[key],
        };
      });
  }

  findEthernetInterface(id?: string): InterfaceMenu | undefined {
    return this.getEthernetInterface().find((value) => value.key === id)?.value;
  }

  getEthernetLink(): { key: string; value: LinkMenu }[] {
    return Object.keys(this.device.Device.Ethernet.Link)
      .filter((val) => !val.includes("_"))
      .map((item) => {
        const key = Number(item);
        return {
          key: `Device.Ethernet.Link.${key}`,
          value: this.device.Device.Ethernet.Link[key],
        };
      });
  }

  findEthernetLink(id: string): LinkMenu | undefined {
    return this.getEthernetLink().find((value) => value.key === id)?.value;
  }

  getInterfaceGeneric(): { key: string; value: GenericMenu }[] {
    return Object.keys(this.device.Device.X_MIKROTIK_Interface.Generic)
      .filter((val) => !val.includes("_"))
      .map((item) => {
        const key = Number(item);
        return {
          key: `Device.X_MIKROTIK_Interface.Generic.${key}`,
          value: this.device.Device.X_MIKROTIK_Interface.Generic[key],
        };
      });
  }

  findInterfaceGeneric(id: string): GenericMenu | undefined {
    return this.getInterfaceGeneric().find((value) => value.key === id)?.value;
  }

  getDeviceInfo(): BasicTable {
    const deviceInfo = [] as BasicTable;

    deviceInfo.push({
      field: "Description",
      value: this.device.Device.DeviceInfo.Description._value,
    });
    deviceInfo.push({
      field: "Hardware Version",
      value: this.device.Device.DeviceInfo.HardwareVersion._value,
    });
    deviceInfo.push({
      field: "Manufacturer",
      value: this.device.Device.DeviceInfo.Manufacturer._value,
    });
    deviceInfo.push({
      field: "Manufacturer OUI",
      value: this.device.Device.DeviceInfo.ManufacturerOUI._value,
    });
    deviceInfo.push({
      field: "Total Memory",
      value: this.device.Device.DeviceInfo.MemoryStatus.Total._value,
    });
    deviceInfo.push({
      field: "Free Memory",
      value: this.device.Device.DeviceInfo.MemoryStatus.Free._value,
    });
    deviceInfo.push({
      field: "Model Name",
      value: this.device.Device.DeviceInfo.ModelName._value,
    });
    deviceInfo.push({
      field: "Serial Number",
      value: this.device.Device.DeviceInfo.SerialNumber._value,
    });
    deviceInfo.push({
      field: "Software Version",
      value: this.device.Device.DeviceInfo.SoftwareVersion._value,
    });
    deviceInfo.push({
      field: "Up Time",
      value: this.device.Device.DeviceInfo.UpTime._value,
    });
    Object.keys(this.device.Device.DeviceInfo.VendorConfigFile)
      .filter((key) => !key.includes("_"))
      .forEach((key) => {
        const item = parseInt(key, 10);
        deviceInfo.push({
          field: `Vendor Config File ${item} Name`,
          value:
            this.device.Device.DeviceInfo.VendorConfigFile[item].Name._value,
        });
        deviceInfo.push({
          field: `Vendor Config File ${item} Description`,
          value:
            this.device.Device.DeviceInfo.VendorConfigFile[item].Description
              ._value,
        });
        deviceInfo.push({
          field: `Vendor Config File ${item} Use For Backup Restore`,
          value:
            this.device.Device.DeviceInfo.VendorConfigFile[item]
              .UseForBackupRestore._value,
        });
      });

    return deviceInfo;
  }

  getEthernets(): BasicTable {
    const ethernets = [] as BasicTable;

    Object.keys(this.device.Device.Ethernet.Interface)
      .filter((key) => !key.includes("_"))
      .forEach((key) => {
        const item = parseInt(key, 10);
        ethernets.push({
          field: `Interface ${item} Name`,
          value:
            this.device.Device.Ethernet.Interface[item].X_MIKROTIK_Name._value,
        });
        ethernets.push({
          field: `Interface ${item} MAC Address`,
          value: this.device.Device.Ethernet.Interface[item].MACAddress._value,
        });
        ethernets.push({
          field: `Interface ${item} Current Bit Rate`,
          value:
            this.device.Device.Ethernet.Interface[item].CurrentBitRate._value,
        });
        ethernets.push({
          field: `Interface ${item} Enable`,
          value: this.device.Device.Ethernet.Interface[item].Enable._value,
        });
        ethernets.push({
          field: `Interface ${item} Status`,
          value: this.device.Device.Ethernet.Interface[item].Status._value,
        });
        ethernets.push({
          field: `Interface ${item} Comment`,
          value:
            this.device.Device.Ethernet.Interface[item].X_MIKROTIK_Comment
              ._value,
        });
      });

    return ethernets;
  }

  getMenuItem(): AppMenuItem {
    const deviceID = encodeURIComponent(this.device._id);
    const menu = {
      label: this.device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value,
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "IP",
          icon: "pi pi-fw pi-cog",
          items: [
            {
              label: "Address",
              icon: "pi pi-fw pi-globe",
              to: `/devices/${deviceID}/ip/address`,
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
              to: `/devices/${deviceID}/system/reboot`,
            },
            {
              label: "Resources",
              icon: "pi pi-fw pi-database",
              to: `/devices/${deviceID}/system/resources`,
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
}
