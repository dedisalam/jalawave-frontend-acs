export interface Base {
  _object: boolean;
  _timestamp: string;
  _writable: boolean;
}

interface String extends Base {
  _type: "xsd:string";
  _value: string;
}

interface UnsignedInteger extends Base {
  _type: "xsd:unsignedInt";
  _value: number | string;
}

interface DateTime extends Base {
  _type: "xsd:dateTime";
  _value: string;
}

interface Boolean extends Base {
  _type: "xsd:boolean";
  _value: boolean;
}

interface Integer extends Base {
  _type: "xsd:int";
  _value: number;
}

export type Menu = String | UnsignedInteger | DateTime | Boolean | Integer;
