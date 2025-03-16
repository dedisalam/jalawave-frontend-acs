import { Base, MenuUnsignedInteger } from "@/types/genieacs/base";

export interface Stats extends Base {
  BytesReceived: MenuUnsignedInteger;
  BytesSent: MenuUnsignedInteger;
  DiscardPacketsReceived: MenuUnsignedInteger;
  DiscardPacketsSent: MenuUnsignedInteger;
  ErrorsReceived: MenuUnsignedInteger;
  ErrorsSent: MenuUnsignedInteger;
  PacketsReceived: MenuUnsignedInteger;
  PacketsSent: MenuUnsignedInteger;
}
