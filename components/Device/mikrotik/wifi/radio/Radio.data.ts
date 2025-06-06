import { Data } from "./Radio";

export const emptyData: Data = {
  Id: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  LowerLayers: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  PossibleChannels: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  Stats: {
    Noise: {
      _type: "xsd:int",
      _value: 0,
      _object: false,
      _timestamp: Date.now().toString(),
      _writable: false,
    },
    _object: true,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  SupportedStandards: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  X_MIKROTIK_Stats: {
    OverallTxCCQ: {
      _type: "xsd:unsignedInt",
      _value: 0,
      _object: false,
      _timestamp: Date.now().toString(),
      _writable: false,
    },
    _object: true,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  AutoChannelEnable: {
    _type: "xsd:boolean",
    _value: false,
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
  AutoChannelSupported: {
    _type: "xsd:boolean",
    _value: false,
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  Channel: {
    _type: "xsd:unsignedInt",
    _value: 0,
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
  Enable: {
    _type: "xsd:boolean",
    _value: false,
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
  OperatingFrequencyBand: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
  OperatingStandards: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
  Status: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  SupportedFrequencyBands: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  _object: true,
  _timestamp: Date.now().toString(),
  _writable: false,
};
