import { Base } from "@/types/genieacs/base";
import { RuleMenu } from "./ruleMenu";

export interface Rule extends Base {
  [key: number]: RuleMenu;
}
