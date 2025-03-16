import { Base, Menu } from "./base";

interface NeighboringWiFiDiagnostic extends Base {
  DiagnosticsState: Menu;
  Result: Base;
  ResultNumberOfEntries: Menu;
}

interface Stats extends Base {
  Noise: Menu;
}

interface X_MIKROTIK_Stats extends Base {
  OverallTxCCQ: Menu;
}

interface RadioMenu {
  AutoChannelEnable: Menu;
  AutoChannelSupported: Menu;
  Channel: Menu;
  Enable: Menu;
  LowerLayers: Menu;
  OperatingFrequencyBand: Menu;
  OperatingStandards: Menu;
  PossibleChannels: Menu;
  Stats: Stats;
  Status: Menu;
  SupportedFrequencyBands: Menu;
  SupportedStandards: Menu;
  X_MIKROTIK_Stats: X_MIKROTIK_Stats;
}

interface Radio extends Base {
  "1": RadioMenu;
}

interface SSIDMenu extends Base {
  BSSID: Menu;
  Enable: Menu;
  LowerLayers: Menu;
  MACAddress: Menu;
  SSID: Menu;
  Stats: {
    BytesReceived: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    BytesSent: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    DiscardPacketsReceived: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    DiscardPacketsSent: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    ErrorsReceived: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    ErrorsSent: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    PacketsReceived: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    PacketsSent: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    _object: true;
    _timestamp: "2025-03-14T01:42:59.467Z";
    _writable: false;
  };
  Status: {
    _object: false;
    _timestamp: "2025-03-14T01:42:59.471Z";
    _type: "xsd:string";
    _value: "LowerLayerDown";
    _writable: false;
  };
}

interface SSID extends Base {
  "1": SSIDMenu;
}

export interface WiFi extends Base {
  AccessPoint: Base;
  AccessPointNumberOfEntries: Menu;
  NeighboringWiFiDiagnostic: NeighboringWiFiDiagnostic;
  Radio: Radio;
  RadioNumberOfEntries: Menu;
  SSID: {
    "1": {
      BSSID: {
        _object: false;
        _timestamp: "2025-03-14T01:42:59.471Z";
        _type: "xsd:string";
        _value: "E4:8D:8C:D8:D3:C0";
        _writable: false;
      };
      Enable: {
        _object: false;
        _timestamp: "2025-03-14T01:42:59.471Z";
        _type: "xsd:boolean";
        _value: true;
        _writable: true;
      };
      LowerLayers: {
        _object: false;
        _timestamp: "2025-03-14T01:42:59.471Z";
        _type: "xsd:string";
        _value: "Device.WiFi.Radio.1";
        _writable: true;
      };
      MACAddress: {
        _object: false;
        _timestamp: "2025-03-14T01:42:59.471Z";
        _type: "xsd:string";
        _value: "E4:8D:8C:D8:D3:C0";
        _writable: false;
      };
      SSID: {
        _object: false;
        _timestamp: "2025-03-15T16:07:58.900Z";
        _type: "xsd:string";
        _value: "MikroTik";
        _writable: true;
      };
      Stats: {
        BytesReceived: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        BytesSent: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        DiscardPacketsReceived: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        DiscardPacketsSent: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        ErrorsReceived: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        ErrorsSent: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        PacketsReceived: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        PacketsSent: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 0;
          _writable: false;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: false;
      };
      Status: {
        _object: false;
        _timestamp: "2025-03-14T01:42:59.471Z";
        _type: "xsd:string";
        _value: "LowerLayerDown";
        _writable: false;
      };
      _object: true;
      _timestamp: "2025-03-14T01:42:59.467Z";
      _writable: true;
    };
    _object: true;
    _timestamp: "2025-03-15T16:07:58.898Z";
    _writable: true;
  };
  SSIDNumberOfEntries: Menu;
}
