import { NextRequest, NextResponse } from "next/server";
import { users } from "@/lib/users";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return NextResponse.json({ access: true });
    } else {
      return NextResponse.json({ access: false });
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
