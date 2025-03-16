import { Base, Menu } from "@/types/genieacs/base";
import { Rule } from "./rule";

export interface ChainMenu extends Base {
  Enable: Menu;
  Name: Menu;
  Rule: Rule;
  RuleNumberOfEntries: Menu;
}
