import { db } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const suggestions = await db.car.findMany({
    where: {
      OR: [
        { make: { contains: query } },
        { model: { contains: query } },
      ],
    },
    take: 5,
    select: {
      make: true,
      model: true,
    },
    distinct: ['make', 'model'],
  });

  const unique = new Set();
  const formatted = suggestions.map(car => {
    const label = `${car.make} ${car.model}`;
    if (!unique.has(label)) {
      unique.add(label);
      return label;
    }
  }).filter(Boolean);

  return new Response(JSON.stringify(formatted), { status: 200 });
}
