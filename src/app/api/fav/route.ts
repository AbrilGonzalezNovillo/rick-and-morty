import { NextRequest, NextResponse } from "next/server";
import { addFavorite, getFavorites } from "@/lib/favorites";

export async function GET() {
  return NextResponse.json(getFavorites());
}

export async function POST(request: NextRequest) {
  try {
    const character = await request.json();
    const favorites = addFavorite(character);
    return NextResponse.json(favorites);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
