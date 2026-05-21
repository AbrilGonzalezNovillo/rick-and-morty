import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://rickandmortyapi.com/api/character";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );
    }

    const data = await response.json();
    const { status, name, species, origin, image, gender, location } = data;

    const character = {
      id: data.id,
      status,
      name,
      species,
      origin,
      image,
      gender,
      location,
    };

    return NextResponse.json(character);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch character" },
      { status: 500 }
    );
  }
}
