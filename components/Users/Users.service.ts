import axios, { AxiosResponse } from "axios";
import { User } from "@/types/users";

export class UsersService {
  async findAll(): Promise<AxiosResponse<User[]>> {
    const url = `${process.env.NEXT_PUBLIC_GENIEACS_URL}/users`;

    const response = await axios.get<User[]>(url);

    return response;
  }
}
