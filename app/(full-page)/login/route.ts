import { User } from "@/types/users";
import axios, { AxiosResponse } from "axios";
import { pbkdf2Sync } from "crypto";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body: { username: string; password: string } = await request.json();

  const findAll = async (): Promise<AxiosResponse<User[]>> => {
    const url = `${process.env.NEXT_PUBLIC_GENIEACS_URL}/users`;

    const response = await axios.get<User[]>(url);

    return response;
  };

  const findById = async (id: string): Promise<User | undefined> => {
    const response = await findAll();
    const users = response.data;

    const user = users.find((user) => user._id === id);

    return user;
  };

  const hashPassword = (password: string, salt: string): string => {
    const key = pbkdf2Sync(password, salt, 10000, 128, "sha512");

    return key.toString("hex");
  };

  const login = async (
    username: string,
    password: string
  ): Promise<NextResponse> => {
    const user = await findById(username);
    if (user === undefined) {
      return NextResponse.json(
        { message: "Wrong username / password" },
        { status: 401 }
      );
    }

    const hashedPassword = hashPassword(password, user.salt);
    if (user.password !== hashedPassword) {
      return NextResponse.json(
        { message: "Wrong username / password" },
        { status: 401 }
      );
    }

    const cookieStorage = await cookies();

    cookieStorage.set("AUTH", user._id, { httpOnly: true });

    return NextResponse.json(user, { status: 200 });
  };

  return login(body.username, body.password);
}
