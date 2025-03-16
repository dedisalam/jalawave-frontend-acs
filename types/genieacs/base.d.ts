export interface Base {
  _object: boolean;
  _timestamp?: string;
  _writable?: boolean;
}

export interface MenuString extends Base {
  _type: "xsd:string";
  _value: string;
}

export interface MenuUnsignedInteger extends Base {
  _type: "xsd:unsignedInt";
  _value: number;
}

export interface MenuUnsignedIntegerString extends Base {
  _type: "xsd:unsignedInt";
  _value: string;
}

export interface MenuDateTime extends Base {
  _type: "xsd:dateTime";
  _value: string;
}

export interface MenuBoolean extends Base {
  _type: "xsd:boolean";
  _value: boolean;
}

export interface MenuInteger extends Base {
  _type: "xsd:int";
  _value: number;
}

export interface MenuHexBinary extends Base {
  _type: "xsd:hexBinary­";
  _value: string;
}
