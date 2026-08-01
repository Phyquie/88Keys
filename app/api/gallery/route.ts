import { getGalleryItems, seedGalleryItemsIfEmpty } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Seed initial items if MongoDB contains 0 gallery items
    await seedGalleryItemsIfEmpty();

    const items = await getGalleryItems();
    return Response.json(items);
  } catch (error) {
    console.error("Failed to load gallery items:", error);
    return Response.json({ error: "Failed to load gallery items." }, { status: 500 });
  }
}
