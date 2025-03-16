import {
  Base,
  MenuBoolean,
  MenuString,
  MenuUnsignedInteger,
} from "@/types/genieacs/base";
import { Rule } from "./rule";

export interface ChainMenu extends Base {
  Enable: MenuBoolean;
  Name: MenuString;
  Rule: Rule;
  RuleNumberOfEntries: MenuUnsignedInteger;
}
