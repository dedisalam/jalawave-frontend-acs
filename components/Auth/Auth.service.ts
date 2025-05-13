import axios, { AxiosResponse } from "axios";
import { User } from "@/types/users";

export class AuthService {
  async findAll(): Promise<AxiosResponse<User[]>> {
    const url = `${process.env.NEXT_PUBLIC_GENIEACS_URL}/users`;

    const response = await axios.get<User[]>(url);

    return response;
  }

  async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<User>> {
    const url = "/login";

    const response = await axios.post(url, { username, password });

    return response;
  }

  async logout(): Promise<AxiosResponse> {
    const url = "/logout";

    const response = await axios.delete(url);

    return response;
  }
}
