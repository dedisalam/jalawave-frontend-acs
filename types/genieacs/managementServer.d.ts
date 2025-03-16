import { Base, Menu } from "./base";

export interface ManagementServer extends Base {
  AliasBasedAddressing: Menu;
  ConnectionRequestPassword: Menu;
  ConnectionRequestURL: Menu;
  ConnectionRequestUsername: Menu;
  InformParameter: Base;
  InformParameterNumberOfEntries: Menu;
  ParameterKey: Menu;
  Password: Menu;
  PeriodicInformEnable: Menu;
  PeriodicInformInterval: Menu;
  URL: Menu;
  Username: Menu;
}
