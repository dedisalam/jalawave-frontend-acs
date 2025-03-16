import {
  Base,
  MenuBoolean,
  MenuInteger,
  MenuString,
  MenuUnsignedInteger,
} from "@/types/genieacs/base";

interface PoolMenuBase extends Base {
  DNSServers: MenuString;
  Enable: MenuBoolean;
  IPRouters: MenuString;
  Interface: MenuString;
  LeaseTime: MenuInteger;
  MaxAddress: MenuString;
  MinAddress: MenuString;
  Status: MenuString;
  SubnetMask: MenuString;
}

export interface PoolMenuMikrotik extends PoolMenuBase {
  Client: Base;
  ClientNumberOfEntries: MenuUnsignedInteger;
  DomainName: MenuString;
  StaticAddress: Base;
  StaticAddressNumberOfEntries: MenuUnsignedInteger;
}

export type PoolMenuRuijie = PoolMenuBase;
