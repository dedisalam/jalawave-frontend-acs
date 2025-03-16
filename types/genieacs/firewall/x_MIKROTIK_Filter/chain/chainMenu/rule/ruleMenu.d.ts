import { Base, Menu } from "@/types/genieacs/base";

export interface RuleMenu extends Base {
  ConnState: Menu;
  ConnStateExclude: Menu;
  Description: Menu;
  DestIPExclude: Menu;
  DestIPRange: Menu;
  DestInterface: Menu;
  DestInterfaceExclude: Menu;
  DestInterfaceGroup: Menu;
  DestPortExclude: Menu;
  DestPortList: Menu;
  Enable: Menu;
  Log: Menu;
  Order: Menu;
  Protocol: Menu;
  ProtocolExclude: Menu;
  SourceIPExclude: Menu;
  SourceIPRange: Menu;
  SourceInterface: Menu;
  SourceInterfaceExclude: Menu;
  SourceInterfaceGroup: Menu;
  SourcePortExclude: Menu;
  SourcePortList: Menu;
  Target: Menu;
  TargetChain: Menu;
}
