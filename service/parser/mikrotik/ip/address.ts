import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { IPAddress } from "@/types/mikrotik";
import ipaddr from "ipaddr.js";
import { Link } from "../ethernet/link";
import { SSID } from "../wifi/ssid";
import { Interface as IpInterface } from "./interface";

export class Address {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): IPAddress[] {
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
        const IPInterface = new IpInterface(this.device).findById({
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
            const EthernetLink = new Link(this.device).findById(
              IPInterface.LowerLayers
            );

            if (EthernetLink) {
              if (
                EthernetLink.LowerLayers._value.includes("Device.WiFi.SSID")
              ) {
                const WiFiSSID = new SSID(this.device).findById(
                  EthernetLink.LowerLayers
                );
                if (WiFiSSID) {
                  const WiFiRadio = new Radio(this.device).findById(
                    WiFiSSID.LowerLayers
                  );
                  if (WiFiRadio) {
                    const ids = WiFiRadio.Id._value.split(".");
                    const id = ids[ids.length - 1];

                    HWInterfaceId = WiFiRadio.Id;
                    HWInterfaceName = { ...WiFiRadio.Id, _value: `wlan${id}` };
                  }
                }
              } else {
                const EthernetInterface = new Interface(this.device).findById(
                  EthernetLink.LowerLayers
                );
                if (EthernetInterface) {
                  HWInterfaceId = EthernetInterface.Id;
                  HWInterfaceName = EthernetInterface.X_MIKROTIK_Name;
                }
              }
            }
          } else {
            const InterfaceGeneric = new Generic(this.device).findById(
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

  findById(id: MenuString): IPAddress | undefined {
    const data = this.findAll().find(({ Id }) => Id._value === id._value);

    return data;
  }

  findByIPInterface(ipInterface: MenuString): IPAddress[] | undefined {
    const data = this.findAll().filter(
      ({ IPInterface }) => IPInterface._value === ipInterface._value
    );

    return data;
  }
}
