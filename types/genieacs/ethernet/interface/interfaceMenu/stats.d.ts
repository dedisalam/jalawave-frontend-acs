import { Base, Menu } from "@/types/genieacs/base";

export interface Stats extends Base {
  BytesReceived: Menu;
  BytesSent: Menu;
  DiscardPacketsReceived: Menu;
  DiscardPacketsSent: Menu;
  ErrorsReceived: Menu;
  ErrorsSent: Menu;
  PacketsReceived: Menu;
  PacketsSent: Menu;
}
