import { Data } from "./Link";

export const emptyData: Data = {
  Id: {
    _type: "xsd:string",
    _value: "",
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: false,
  },
  Enable: {
    _type: "xsd:boolean",
    _value: false,
    _object: false,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
  LowerLayers: {
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
  _object: true,
  _timestamp: Date.now().toString(),
  _writable: false,
};
