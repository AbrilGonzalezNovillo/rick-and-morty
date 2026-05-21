import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://rickandmortyapi.com/api/character";
const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page") || "1");

  // La API devuelve 20 por página. Para mostrar 10:
  // UI page 1 → API page 1, items 0-9
  // UI page 2 → API page 1, items 10-19
  // UI page 3 → API page 2, items 0-9 ...
  const apiPage = Math.ceil(page / 2);
  const isSecondHalf = page % 2 === 0;

  try {
    const res = await fetch(`${API_URL}?page=${apiPage}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);

    const data = await res.json();
    const totalCharacters = data.info.count;
    const totalPages = Math.ceil(totalCharacters / PAGE_SIZE);

    const characters = (isSecondHalf ? data.results.slice(10) : data.results.slice(0, 10)).map(
      (c: { id: number; name: string; status: string; species: string; gender: string; origin: { name: string; url: string }; image: string }) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        gender: c.gender,
        origin: c.origin,
        image: c.image,
      })
    );

    return NextResponse.json({ characters, totalPages, page });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return NextResponse.json(
      { error: "Failed to fetch characters" },
      { status: 500 }
    );
  }
}
