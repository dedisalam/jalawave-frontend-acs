import { Data } from "./Address";

export const emptyData: Data = {
  _object: true,
  AddressingType: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "Static",
    _writable: true,
  },
  Enable: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:boolean",
    _value: false,
    _writable: true,
  },
  Id: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "",
    _writable: true,
  },
  IPAddress: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "0.0.0.0",
    _writable: true,
  },
  Status: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "",
    _writable: true,
  },
  SubnetMask: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "255.255.255.0",
    _writable: true,
  },
};
