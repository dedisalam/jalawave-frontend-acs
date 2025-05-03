import { GenieService } from "@/service/GenieService";
import { AxiosResponse } from "axios";
import { Data } from "./Generic";

export class GenericService {
  private genieService: GenieService;
  constructor() {
    this.genieService = new GenieService();
  }

  async refresh(id: string): Promise<AxiosResponse> {
    return await this.genieService.refreshObject(
      id,
      "Device.X_MIKROTIK_Interface.Generic"
    );
  }

  async update(id: string, data: Data): Promise<AxiosResponse> {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.Enable`, data.Enable._value, data.Enable._type],
    ]);

    await this.refresh(id);

    return response;
  }
}
