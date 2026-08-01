import { saveGalleryItem, deleteGalleryItem } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const itemData = await request.json();
    if (!itemData.title || !itemData.tag || !itemData.department || !itemData.image) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Validate department
    const validDepts = ["Piano", "Guitar", "Bass", "Drums", "Dance"];
    if (!validDepts.includes(itemData.department)) {
      return Response.json({ error: "Invalid department option." }, { status: 400 });
    }

    const savedItem = await saveGalleryItem(itemData);
    return Response.json({ success: true, item: savedItem });
  } catch (error) {
    console.error("Failed to save gallery item:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Gallery Item ID is required." }, { status: 400 });
    }

    const deleted = await deleteGalleryItem(id);

    if (!deleted) {
      return Response.json({ error: "Gallery item not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery item:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
