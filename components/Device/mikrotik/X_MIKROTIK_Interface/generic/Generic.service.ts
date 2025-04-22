import { GenieService } from "@/service/GenieService";
import { InterfaceGeneric } from "@/types/mikrotik";
import { AxiosResponse } from "axios";

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

  async update(id: string, data: InterfaceGeneric): Promise<AxiosResponse> {
    const response = await this.genieService.setParameterValues(id, [
      [`${data.Id._value}.Enable`, data.Enable._value, data.Enable._type],
    ]);

    await this.refresh(id);

    return response;
  }
}
