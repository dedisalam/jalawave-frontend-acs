import { Base } from "@/types/genieacs/base";

export interface Chain extends Base {
  "1": {
    Enable: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:boolean";
      _value: true;
      _writable: true;
    };
    Name: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:string";
      _value: "srcnat";
      _writable: true;
    };
    Rule: {
      _object: true;
      _timestamp: "2025-03-14T01:42:59.467Z";
      _writable: true;
    };
    RuleNumberOfEntries: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 0;
      _writable: false;
    };
    _object: true;
    _timestamp: "2025-03-14T01:42:59.467Z";
    _writable: true;
  };
  "2": {
    Enable: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:boolean";
      _value: true;
      _writable: true;
    };
    Name: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:string";
      _value: "dstnat";
      _writable: true;
    };
    Rule: {
      "1": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to NX-Filter01";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 1;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 6;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.116.88/29";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.103.183";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "2": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to NX-Filter01";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 2;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 17;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.116.88/29";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.103.183";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "3": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to NX-Filter02";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 3;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 6;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.116.88/29";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.103.124";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "4": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to NX-Filter02";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 4;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 17;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.116.88/29";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.103.124";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "5": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to RPZ";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 5;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 6;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.103.125";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "6": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 6;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 17;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.103.125";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "7": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to Trust-NG-1";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 7;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 6;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "202.51.232.121";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "8": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 8;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 17;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "202.51.232.121";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "9": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to Google";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 9;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 6;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "8.8.8.8";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "10": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 10;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 17;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "8.8.8.8";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "11": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "Redirect to Trust-NG-2";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 11;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 6;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.112.34";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      "12": {
        Description: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        DestInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        DestPortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        DestPortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        Enable: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Log: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        Order: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:unsignedInt";
          _value: 12;
          _writable: true;
        };
        Protocol: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:int";
          _value: 17;
          _writable: true;
        };
        ProtocolExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceIPRange: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterface: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        SourceInterfaceExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourceInterfaceGroup: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "all";
          _writable: true;
        };
        SourcePortExclude: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:boolean";
          _value: false;
          _writable: true;
        };
        SourcePortList: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        Target: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "DestNAT";
          _writable: true;
        };
        TargetChain: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "";
          _writable: true;
        };
        ToAddresses: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "60.253.112.34";
          _writable: true;
        };
        ToPorts: {
          _object: false;
          _timestamp: "2025-03-14T01:42:59.471Z";
          _type: "xsd:string";
          _value: "53";
          _writable: true;
        };
        _object: true;
        _timestamp: "2025-03-14T01:42:59.467Z";
        _writable: true;
      };
      _object: true;
      _timestamp: "2025-03-14T01:42:59.467Z";
      _writable: true;
    };
    RuleNumberOfEntries: {
      _object: false;
      _timestamp: "2025-03-14T01:42:59.471Z";
      _type: "xsd:unsignedInt";
      _value: 12;
      _writable: false;
    };
    _object: true;
    _timestamp: "2025-03-14T01:42:59.467Z";
    _writable: true;
  };
}
