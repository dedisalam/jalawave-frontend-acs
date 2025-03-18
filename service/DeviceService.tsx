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
  commonReturn(
    device: DeviceObjectMikrotik | DeviceObjectRuijie | DeviceObjectYealink
  ): Device {
    const lastUpdateInfo =
      new Date(device._lastInform).getFullYear() +
      "-" +
      (new Date(device._lastInform).getMonth() + 1) +
      "-" +
      new Date(device._lastInform).getDate() +
      " " +
      new Date(device._lastInform).getHours() +
      ":" +
      new Date(device._lastInform).getMinutes() +
      ":" +
      new Date(device._lastInform).getSeconds();

    const inform = new Date(device._lastInform).getTime();
    const now = new Date().getTime();
    let status = "";
    if (inform > now - 5 * 60 * 1000) {
      status = "Online";
    }
    if (
      inform > now - 5 * 60 * 1000 - 24 * 60 * 60 * 1000 &&
      inform < now - 5 * 60 * 1000
    ) {
      status = "Disconnect";
    }
    if (inform < now - 5 * 60 * 1000 - 24 * 60 * 60 * 1000) {
      status = "Other";
    }

    return {
      id: device._id,
      serialNumber: device.Device.DeviceInfo.SerialNumber._value,
      dhcpClientIp: "",
      identity: "",
      ip: "",
      lastUpdateInfo,
      manufacturer: device.Device.DeviceInfo.Manufacturer._value,
      productType: device.Device.DeviceInfo.ProductClass._value,
      softwareVersion: device.Device.DeviceInfo.SoftwareVersion._value,
      status,
    };
  },

  mikrotik(device: DeviceObjectMikrotik): Device {
    const result = this.commonReturn(device);

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
    result.identity = device.Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value;
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

    return result;
  },

  ruijie(device: DeviceObjectRuijie): Device {
    const result = this.commonReturn(device);
    result.serialNumber = device.Device.DeviceInfo.SerialNumber._value;
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

    return result;
  },

  yealink(device: DeviceObjectYealink): Device {
    const result = this.commonReturn(device);
    result.ip = device.Device.LAN.IPAddress._value;

    return result;
  },

  async getData(id?: string): Promise<Device[]> {
    let url = "http://60.253.103.102:7557/devices";
    if (id) {
      url = `http://60.253.103.102:7557/devices/?query=%7B%22_id%22%3A%22${id}%22%7D`;
    }

    const response = await axios.get<DeviceObject[]>(url);

    const device = response.data.map((device) => {
      switch (device._deviceId._Manufacturer) {
        case "MikroTik":
          return this.mikrotik(device as DeviceObjectMikrotik);
          break;

        case "Ruijie Networks Co., Ltd":
          return this.ruijie(device as DeviceObjectRuijie);
          break;

        case "Yealink":
          return this.yealink(device as DeviceObjectYealink);
          break;

        default:
          const defaultDevice = device as DeviceObjectDiscovery;
          const lastUpdateInfo =
            new Date(device._lastInform).getFullYear() +
            "-" +
            (new Date(device._lastInform).getMonth() + 1) +
            "-" +
            new Date(device._lastInform).getDate() +
            " " +
            new Date(device._lastInform).getHours() +
            ":" +
            new Date(device._lastInform).getMinutes() +
            ":" +
            new Date(device._lastInform).getSeconds();

          const defaultResult: Device = {
            id: defaultDevice._id,
            serialNumber: defaultDevice._deviceId._SerialNumber,
            dhcpClientIp: "",
            identity: "",
            ip: "",
            lastUpdateInfo,
            manufacturer: defaultDevice._deviceId._Manufacturer,
            productType: defaultDevice._deviceId._ProductClass,
            softwareVersion: "",
            status: "Other",
          };
          return defaultResult;
          break;
      }
    }) as Device[];

    return device;
  },
};
