import {
  DeviceObject,
  DeviceObjectDiscovery,
  DeviceObjectMikrotik,
  DeviceObjectRuijie,
  DeviceObjectYealink,
} from "@/types/genieacs";
import { Device } from "@/types/table";
import axios from "axios";

export const DeviceService = {
  async getData(): Promise<Device[]> {
    const response = await axios.get<DeviceObject[]>(
      "http://60.253.103.102:7557/devices"
    );

    const mikrotik = (device: DeviceObjectMikrotik): Device => {
      const result = {} as Device;
      result.id = device._id;
      result.arch = device.Device.DeviceInfo.X_MIKROTIK_ArchName._value;
      result.serialNumber = device.Device.DeviceInfo.SerialNumber._value;

      const dhcpClientKeys = Object.keys(device.Device.DHCPv4.Client)
        .filter((item) => !item.startsWith("_"))
        .map((item) => Number(item));
      const dhcpClientIp = dhcpClientKeys
        .map(
          (dhcpClientKey) =>
            device.Device.DHCPv4.Client[dhcpClientKey].IPAddress._value
        )
        .filter((item) => item.length !== 0)
        .join(", ");

      result.dhcpClientIp = dhcpClientIp;
      result.identity =
        device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value;

      const interfaceKeys = Object.keys(device.Device.IP.Interface)
        .filter((item) => !item.startsWith("_"))
        .map((item) => Number(item));
      const ip = interfaceKeys
        .map((interfaceKey) => {
          const ipv4AddressKeys = Object.keys(
            device.Device.IP.Interface[interfaceKey].IPv4Address
          )
            .filter((item) => !item.startsWith("_"))
            .map((item) => Number(item));

          return ipv4AddressKeys
            .map(
              (ipv4AddressKey) =>
                device.Device.IP.Interface[interfaceKey].IPv4Address[
                  ipv4AddressKey
                ].IPAddress._value
            )
            .join(", ");
        })
        .filter((item) => item.length !== 0)
        .join(", ");
      result.ip = ip;
      result.lastUpdateInfo = device._lastInform;
      result.manufacturer = device.Device.DeviceInfo.Manufacturer._value;
      result.productType = device.Device.DeviceInfo.ProductClass._value;
      result.softwareVersion = device.Device.DeviceInfo.SoftwareVersion._value;
      result.uptime = device.Device.DeviceInfo.UpTime._value;

      return result;
    };

    const ruijie = (device: DeviceObjectRuijie): Device => {
      const result = {} as Device;
      result.id = device._id;
      result.arch = "";
      result.serialNumber = device.Device.DeviceInfo.SerialNumber._value;
      result.dhcpClientIp = "";
      result.identity = "";
      const interfaceKeys = Object.keys(device.Device.IP.Interface)
        .filter((item) => !item.startsWith("_"))
        .map((item) => Number(item));
      const ip = interfaceKeys
        .map((interfaceKey) => {
          const ipv4AddressKeys = Object.keys(
            device.Device.IP.Interface[interfaceKey].IPv4Address
          )
            .filter((item) => !item.startsWith("_"))
            .map((item) => Number(item));

          return ipv4AddressKeys
            .map(
              (ipv4AddressKey) =>
                device.Device.IP.Interface[interfaceKey].IPv4Address[
                  ipv4AddressKey
                ].IPAddress._value
            )
            .join(", ");
        })
        .filter((item) => item.length !== 0)
        .join(", ");
      result.ip = ip;
      result.lastUpdateInfo = device._lastInform;
      result.manufacturer = device.Device.DeviceInfo.Manufacturer._value;
      result.productType = device.Device.DeviceInfo.ProductClass._value;
      result.softwareVersion = device.Device.DeviceInfo.SoftwareVersion._value;
      result.uptime = device.Device.DeviceInfo.UpTime._value;

      return result;
    };

    const yealink = (device: DeviceObjectYealink): Device => {
      const result = {} as Device;
      result.id = device._id;
      result.arch = "";
      result.serialNumber = device.Device.DeviceInfo.SerialNumber._value;
      result.dhcpClientIp = "";
      result.identity = "";
      result.ip = device.Device.LAN.IPAddress._value;
      result.lastUpdateInfo = device._lastInform;
      result.manufacturer = device.Device.DeviceInfo.Manufacturer._value;
      result.productType = device.Device.DeviceInfo.ProductClass._value;
      result.softwareVersion = device.Device.DeviceInfo.SoftwareVersion._value;
      result.uptime = device.Device.DeviceInfo.UpTime._value;

      return result;
    };

    const device = response.data.map((device) => {
      switch (device._deviceId._Manufacturer) {
        case "MikroTik":
          return mikrotik(device as DeviceObjectMikrotik);
          break;

        case "Ruijie Networks Co., Ltd":
          return ruijie(device as DeviceObjectRuijie);
          break;

        case "Yealink":
          return yealink(device as DeviceObjectYealink);
          break;

        default:
          const defaultDevice = device as DeviceObjectDiscovery;
          const defaultResult: Device = {
            id: defaultDevice._id,
            arch: "",
            serialNumber: defaultDevice._deviceId._SerialNumber,
            dhcpClientIp: "",
            identity: "",
            ip: "",
            lastUpdateInfo: defaultDevice._lastInform,
            manufacturer: defaultDevice._deviceId._Manufacturer,
            productType: defaultDevice._deviceId._ProductClass,
            softwareVersion: "",
            uptime: 0,
          };
          return defaultResult;
          break;
      }
    }) as Device[];

    return device;
  },
};
