import { EthernetLink } from "@/types/mikrotik";
import { GenieService } from "./GenieService";

export class EthernetLinkService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async update(id: string, data: EthernetLink) {
    const response = await this.genieService.setParameterValues(id, [
      [
        `${data.Id._value}.LowerLayers`,
        data.LowerLayers._value,
        data.LowerLayers._type,
      ],
    ]);

    await this.genieService.refreshObject(id, "Device.Ethernet.Link");

    return response;
  }
}
