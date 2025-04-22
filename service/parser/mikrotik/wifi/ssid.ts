import { DeviceObjectMikrotik } from "@/types/genieacs";
import { MenuString } from "@/types/genieacs/base";
import { WiFiSSID } from "@/types/mikrotik";

export class SSID {
  private device: DeviceObjectMikrotik;

  constructor(device: DeviceObjectMikrotik) {
    this.device = device;
  }

  findAll(): WiFiSSID[] {
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

  findById(id: MenuString): WiFiSSID | undefined {
    const data = this.findAll().find(({ Id }) => Id._value === id._value);

    return data;
  }

  findByLowerLayers(lowerLayers: MenuString): WiFiSSID | undefined {
    const data = this.findAll().find(
      ({ LowerLayers }) => LowerLayers._value === lowerLayers._value
    );

    return data;
  }
}
