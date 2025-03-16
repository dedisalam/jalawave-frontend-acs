import {
  Base,
  MenuBoolean,
  MenuDateTime,
  MenuString,
  MenuUnsignedInteger,
} from "./base";

interface ManagementServerBase extends Base {
  ConnectionRequestPassword: MenuString;
  ConnectionRequestURL: MenuString;
  ConnectionRequestUsername: MenuString;
  ParameterKey: MenuString;
  PeriodicInformEnable: MenuBoolean;
  PeriodicInformInterval: MenuUnsignedInteger;
}

export interface ManagementServerMikrotik extends ManagementServerBase {
  AliasBasedAddressing: MenuBoolean;
  InformParameter: Base;
  InformParameterNumberOfEntries: MenuUnsignedInteger;
  Password: MenuString;
  URL: MenuString;
  Username: MenuString;
}

export interface ManagementServerYealink extends ManagementServerBase {
  CWMPRetryIntervalMultiplier: Base;
  CWMPRetryMinimumWaitInterval: Base;
  NATDetected: Base;
  Password: Base;
  PeriodicInformTime: MenuDateTime;
  STUNEnable: Base;
  STUNMaximumKeepAlivePeriod: Base;
  STUNMinimumKeepAlivePeriod: Base;
  STUNPassword: Base;
  STUNServerAddress: Base;
  STUNServerPort: Base;
  STUNUsername: Base;
  UDPConnectionRequestAddress: Base;
  UDPConnectionRequestAddressNotificationLimit: Base;
  UpgradesManaged: Base;
  URL: Base;
  Username: Base;
  X_001565_TR069Enable: Base;
}

interface ManagementServerRuijie extends ManagementServerBase {
  NATDetected: MenuBoolean;
  Password: MenuString;
  PeriodicInformTime: MenuDateTime;
  STUNEnable: MenuBoolean;
  UDPConnectionRequestAddress: MenuString;
  URL: MenuString;
  Username: MenuString;
}
