import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const logout = async (): Promise<NextResponse> => {
    const cookieStorage = await cookies();

    cookieStorage.delete("AUTH");

    return NextResponse.json({}, { status: 200 });
  };

  return logout();
}
