import { EthernetInterface } from "@/types/mikrotik";
import { GenieService } from "./GenieService";

export class EthernetInterfaceService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async update(id: string, data: EthernetInterface) {
    const response = await this.genieService.setParameterValues(id, [
      [
        `${data.Id._value}.X_MIKROTIK_Name`,
        data.X_MIKROTIK_Name._value,
        data.X_MIKROTIK_Name._type,
      ],
    ]);

    await this.genieService.refreshObject(id, "Device.Ethernet.Interface");

    return response;
  }
}
