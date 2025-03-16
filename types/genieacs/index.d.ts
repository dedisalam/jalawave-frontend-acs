import { Device } from "./device";

export interface DeviceObject {
  _id: string;
  Device: Device;
  _deviceId: {
    _Manufacturer: string;
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
  };
  _lastInform: string;
  _registered: string;
  _timestamp: string;
}
