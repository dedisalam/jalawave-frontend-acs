import {
  DeviceObject,
  DeviceObjectMikrotik,
  DeviceObjectRuijie,
  DeviceObjectYealink,
} from "@/types/genieacs";

export interface Device {
  id: string;
  serialNumber: string;
  manufacturer: string;
  identity: string;
  ip: string;
  dhcpClientIp: string;
  productType: string;
  softwareVersion: string;
  lastUpdateInfo: string;
  status: string;
}

export class Table {
  private devices: DeviceObject[];

  constructor(devices: DeviceObject[]) {
    this.devices = devices;
  }

  getDevices(): Device[] {
    return this.devices.map((device) => {
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
          return {
            dhcpClientIp: "",
            id: "",
            identity: "",
            ip: "",
            lastUpdateInfo: "",
            manufacturer: "",
            productType: "",
            serialNumber: "",
            softwareVersion: "",
            status: "",
          };
          break;
      }
    });
  }

  private mikrotik({
    Device,
    _deviceId,
    _id,
    _lastInform,
    _registered,
    _timestamp,
  }: DeviceObjectMikrotik): Device {
    const result = this.common({
      _deviceId,
      _id,
      _lastInform,
      _registered,
      _timestamp,
      Device,
    });

    const dhcpClientKeys = Object.keys(Device.DHCPv4.Client)
      .filter((item) => !item.startsWith("_"))
      .map((item) => Number(item));
    const dhcpClientIp = dhcpClientKeys
      .map(
        (dhcpClientKey) => Device.DHCPv4.Client[dhcpClientKey].IPAddress._value
      )
      .filter((item) => item.length !== 0)
      .join(", ");
    result.dhcpClientIp = dhcpClientIp;
    result.identity = Device.DeviceInfo.X_MIKROTIK_SystemIdentity._value;
    const interfaceKeys = Object.keys(Device.IP.Interface)
      .filter((item) => !item.startsWith("_"))
      .map((item) => Number(item));
    const ip = interfaceKeys
      .map((interfaceKey) => {
        const ipv4AddressKeys = Object.keys(
          Device.IP.Interface[interfaceKey].IPv4Address
        )
          .filter((item) => !item.startsWith("_"))
          .map((item) => Number(item));

        return ipv4AddressKeys
          .map(
            (ipv4AddressKey) =>
              Device.IP.Interface[interfaceKey].IPv4Address[ipv4AddressKey]
                .IPAddress?._value
          )
          .join(", ");
      })
      .filter((item) => item.length !== 0)
      .join(", ");
    result.ip = ip;

    return result;
  }

  private ruijie({
    Device,
    _deviceId,
    _id,
    _lastInform,
    _registered,
    _timestamp,
  }: DeviceObjectRuijie): Device {
    const result = this.common({
      _deviceId,
      _id,
      _lastInform,
      _registered,
      _timestamp,
      Device,
    });
    result.serialNumber = Device.DeviceInfo.SerialNumber._value;
    const interfaceKeys = Object.keys(Device.IP.Interface)
      .filter((item) => !item.startsWith("_"))
      .map((item) => Number(item));
    const ip = interfaceKeys
      .map((interfaceKey) => {
        const ipv4AddressKeys = Object.keys(
          Device.IP.Interface[interfaceKey].IPv4Address
        )
          .filter((item) => !item.startsWith("_"))
          .map((item) => Number(item));

        return ipv4AddressKeys
          .map(
            (ipv4AddressKey) =>
              Device.IP.Interface[interfaceKey].IPv4Address[ipv4AddressKey]
                .IPAddress._value
          )
          .join(", ");
      })
      .filter((item) => item.length !== 0)
      .join(", ");
    result.ip = ip;

    return result;
  }

  private yealink({
    Device,
    _deviceId,
    _id,
    _lastInform,
    _registered,
    _timestamp,
  }: DeviceObjectYealink): Device {
    const result = this.common({
      _deviceId,
      _id,
      _lastInform,
      _registered,
      _timestamp,
      Device,
    });
    result.ip = Device.LAN.IPAddress._value;

    return result;
  }

  private common({ _lastInform, _id, Device }: DeviceObject): Device {
    const fullYear = new Date(_lastInform).getFullYear();
    const month = new Date(_lastInform).getMonth() + 1;
    const date = new Date(_lastInform).getDate();
    const hours = new Date(_lastInform).getHours();
    const minutes = new Date(_lastInform).getMinutes();
    const seconds = new Date(_lastInform).getSeconds();

    const lastUpdateInfo = `${fullYear}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    const inform = new Date(_lastInform).getTime();
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
      id: _id,
      serialNumber: Device.DeviceInfo.SerialNumber._value,
      dhcpClientIp: "",
      identity: "",
      ip: "",
      lastUpdateInfo,
      manufacturer: Device.DeviceInfo.Manufacturer._value,
      productType: Device.DeviceInfo.ProductClass._value,
      softwareVersion: Device.DeviceInfo.SoftwareVersion._value,
      status,
    };
  }
}
