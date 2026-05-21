import { NextRequest, NextResponse } from "next/server";
import { removeFavorite } from "@/lib/favorites";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const favorites = removeFavorite(Number(id));
  return NextResponse.json(favorites);
}
