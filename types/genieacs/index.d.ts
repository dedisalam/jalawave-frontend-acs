import { DeviceMikrotik, DeviceRuijie, DeviceYealink } from "./device";

interface DeviceObjectBase {
  _id: string;
  _lastInform: string;
  _registered: string;
}

export interface DeviceObjectMikrotik extends DeviceObjectBase {
  Device: DeviceMikrotik;
  _timestamp: string;
  _deviceId: {
    _Manufacturer: "MikroTik";
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
  };
}

export interface DeviceObjectYealink extends DeviceObjectBase {
  Device: DeviceYealink;
  _timestamp: string;
  _deviceId: {
    _Manufacturer: "Yealink";
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
  };
}

export interface DeviceObjectRuijie extends DeviceObjectBase {
  Device: DeviceRuijie;
  _timestamp: string;
  _deviceId: {
    _Manufacturer: "Ruijie Networks Co., Ltd";
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
  };
}

export interface DeviceObjectDiscovery extends DeviceObjectBase {
  _deviceId: {
    _Manufacturer: "DISCOVERYSERVICE";
    _OUI: string;
    _ProductClass: string;
    _SerialNumber: string;
  };
}

export type DeviceObject =
  | DeviceObjectMikrotik
  | DeviceObjectRuijie
  | DeviceObjectYealink;
