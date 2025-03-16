import {
  Base,
  MenuBoolean,
  MenuInteger,
  MenuString,
  MenuUnsignedInteger,
} from "@/types/genieacs/base";

export interface RuleMenu extends Base {
  Description: MenuString;
  DestIPExclude: MenuBoolean;
  DestIPRange: MenuString;
  DestInterface: MenuString;
  DestInterfaceExclude: MenuBoolean;
  DestInterfaceGroup: MenuString;
  DestPortExclude: MenuBoolean;
  DestPortList: MenuString;
  Enable: MenuBoolean;
  Log: MenuBoolean;
  Order: MenuUnsignedInteger;
  Protocol: MenuInteger;
  ProtocolExclude: MenuBoolean;
  SourceIPExclude: MenuBoolean;
  SourceIPRange: MenuString;
  SourceInterface: MenuString;
  SourceInterfaceExclude: MenuBoolean;
  SourceInterfaceGroup: MenuString;
  SourcePortExclude: MenuBoolean;
  SourcePortList: MenuString;
  Target: MenuString;
  TargetChain: MenuString;
  ToAddresses: MenuString;
  ToPorts: MenuString;
}
