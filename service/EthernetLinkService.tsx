import { EthernetLink } from "@/types/mikrotik";
import { GenieService } from "./GenieService";
import { AxiosResponse } from "axios";

export class EthernetLinkService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async refresh(id: string): Promise<AxiosResponse> {
    return await this.genieService.refreshObject(id, "Device.Ethernet.Link");
  }

  async create(id: string): Promise<AxiosResponse> {
    const response = await this.genieService.addObject(
      id,
      "Device.Ethernet.Link"
    );

    await this.refresh(id);

    return response;
  }

  async update(id: string, data: EthernetLink): Promise<AxiosResponse> {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.Enable`, data.Enable._value, data.Enable._type],
      [
        `${data.Id._value}.LowerLayers`,
        data.LowerLayers._value,
        data.LowerLayers._type,
      ],
    ]);

    await this.refresh(id);

    return response;
  }

  async remove(id: string, data: EthernetLink): Promise<AxiosResponse> {
    const response = await this.genieService.deleteObject(id, data.Id._value);

    await this.refresh(id);

    return response;
  }
}
