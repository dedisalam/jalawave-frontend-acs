import {
  Base,
  MenuBoolean,
  MenuString,
  MenuUnsignedInteger,
} from "../../../base";
import { SecurityMikrotik, SecurityRuijie } from "./security";

interface AccessPointMenuBase extends Base {
  Enable: MenuBoolean;
  SSIDReference: MenuString;
  Status: MenuString;
}

export interface AccessPointMenuMikrotik extends AccessPointMenuBase {
  AssociatedDevice: Base;
  AssociatedDeviceNumberOfEntries: MenuUnsignedInteger;
  Security: SecurityMikrotik;
  SSIDAdvertisementEnabled: MenuBoolean;
}

export interface AccessPointMenuRuijie extends AccessPointMenuBase {
  Security: SecurityRuijie;
}
