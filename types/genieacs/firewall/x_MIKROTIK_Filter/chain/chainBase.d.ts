import { Base, Menu } from "@/types/genieacs/base";

export interface ChainBase extends Base {
  Enable: Menu;
  Name: Menu;
  Rule: Base;
  RuleNumberOfEntries: Menu;
}
