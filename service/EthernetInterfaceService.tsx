import { EthernetInterface } from "@/types/mikrotik";
import { GenieService } from "./GenieService";
import { AxiosResponse } from "axios";

export class EthernetInterfaceService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async refresh(id: string): Promise<AxiosResponse> {
    return await this.genieService.refreshObject(
      id,
      "Device.Ethernet.Interface"
    );
  }

  async update(id: string, data: EthernetInterface) {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.Enable`, data.Enable._value, data.Enable._type],
      [
        `${data.Id._value}.X_MIKROTIK_Name`,
        data.X_MIKROTIK_Name._value,
        data.X_MIKROTIK_Name._type,
      ],
      [
        `${data.Id._value}.X_MIKROTIK_Comment`,
        data.X_MIKROTIK_Comment._value,
        data.X_MIKROTIK_Comment._type,
      ],
    ]);

    await this.refresh(id);

    return response;
  }
}
