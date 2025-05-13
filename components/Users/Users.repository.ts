import axios, { AxiosResponse } from "axios";
import { User } from "@/types/users";

export class InterfaceService {
  private host: string;
  constructor() {
    this.host = process.env.NEXT_PUBLIC_GENIEACS_URL || "";
  }

  async findAll(): Promise<AxiosResponse<User[]>> {
    const url = `${this.host}/users`;

    const response = await axios.get<User[]>(url);

    return response;
  }
}
