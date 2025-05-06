import axios, { AxiosResponse } from "axios";
import { User } from "@/types/users";

export class InterfaceService {
  private host: string;
  constructor() {
    this.host = "http://60.253.103.102:7557";
  }

  async findAll(): Promise<AxiosResponse<User[]>> {
    const url = `${this.host}/users`;

    const response = await axios.get<User[]>(url);

    return response;
  }
}
