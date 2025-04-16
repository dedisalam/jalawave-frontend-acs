import { IPAddress } from "@/types/mikrotik";

export const emptyIPAddress: IPAddress = {
  _object: true,
  AddressingType: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "Static",
    _writable: true,
  },
  CIDR: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "0.0.0.0/0",
    _writable: true,
  },
  Enable: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:boolean",
    _value: false,
    _writable: true,
  },
  HWInterface: {
    Id: {
      _object: false,
      _timestamp: Date.now().toString(),
      _type: "xsd:string",
      _value: "",
      _writable: false,
    },
    Name: {
      _object: false,
      _timestamp: Date.now().toString(),
      _type: "xsd:string",
      _value: "",
      _writable: true,
    },
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
  Network: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "0.0.0.0",
    _writable: false,
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
  IPInterface: {
    _object: false,
    _timestamp: Date.now().toString(),
    _type: "xsd:string",
    _value: "",
    _writable: false,
  },
};
