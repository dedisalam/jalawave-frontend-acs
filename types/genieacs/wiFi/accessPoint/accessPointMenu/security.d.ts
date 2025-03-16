import { Base, MenuHexBinary, MenuString } from "@/types/genieacs/base";

interface SecurityBase extends Base {
  KeyPassphrase: MenuString;
  ModeEnabled: MenuString;
  ModesSupported: MenuString;
}

export type SecurityMikrotik = SecurityBase;

export interface SecurityRuijie extends SecurityBase {
  PreSharedKey: MenuHexBinary;
  WEPKey: MenuHexBinary;
}
