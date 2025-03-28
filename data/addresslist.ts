import { AddressListRow } from "@/types/mikrotik/addresslist";

export const emptyAddressList: AddressListRow = {
  key: "",
  value: {
    AddressingType: {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: Date.now().toString(),
      _writable: false,
    },
    Enable: {
      _object: false,
      _type: "xsd:boolean",
      _value: true,
      _timestamp: Date.now().toString(),
      _writable: true,
    },
    IPAddress: {
      _object: false,
      _type: "xsd:string",
      _value: "0.0.0.0",
      _timestamp: Date.now().toString(),
      _writable: true,
    },
    Status: {
      _object: false,
      _type: "xsd:string",
      _value: "Up",
      _timestamp: Date.now().toString(),
      _writable: false,
    },
    SubnetMask: {
      _object: false,
      _type: "xsd:string",
      _value: "255.255.255.255",
      _timestamp: Date.now().toString(),
      _writable: true,
    },
    Network: {
      _object: false,
      _type: "xsd:string",
      _value: "0.0.0.0",
      _timestamp: Date.now().toString(),
      _writable: false,
    },
    Interface: {
      _object: false,
      _type: "xsd:string",
      _value: "",
      _timestamp: "",
      _writable: false,
    },
    CIDR: {
      _object: false,
      _type: "xsd:string",
      _value: "0.0.0.0/0",
      _timestamp: "",
      _writable: false,
    },
    _object: true,
    _timestamp: Date.now().toString(),
    _writable: true,
  },
};
