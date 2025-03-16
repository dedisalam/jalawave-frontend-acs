import { Base } from "@/types/genieacs/base";
import { RuleMenu } from "./ruleMenu";

interface Rule extends Base {
  [key: number]: RuleMenu;
}
