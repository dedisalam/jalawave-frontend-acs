import { DeviceObjectMikrotik } from "@/types/genieacs";
import { ClientMenu } from "@/types/genieacs/dhcpv4/client/clientMenu";
import { InterfaceMenu } from "@/types/genieacs/ethernet/interface/interfaceMenu";
import { LinkMenu } from "@/types/genieacs/ethernet/link/linkMenu";
import { InterfaceMenuMikrotik } from "@/types/genieacs/ip/interface/interfaceMenu";
import { IPv4AddressMenuMikrotik } from "@/types/genieacs/ip/interface/interfaceMenu/ipv4Address/ipv4AddressMenu";
import { GenericMenu } from "@/types/genieacs/x_MIKROTIK_Interface/generic/genericMenu";
import ipaddr from "ipaddr.js";

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
}
