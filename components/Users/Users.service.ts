import axios, { AxiosResponse } from "axios";
import { User } from "@/types/users";

export class UsersService {
  async findAll(): Promise<AxiosResponse<User[]>> {
    const url = "http://60.253.103.102:7557/users";

    const response = await axios.get<User[]>(url);

    return response;
  }
}
