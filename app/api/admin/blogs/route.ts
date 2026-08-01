import { saveBlog, deleteBlog } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const blogData = await request.json();
    if (!blogData.title || !blogData.content || !blogData.author || !blogData.excerpt) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const savedBlog = await saveBlog(blogData);
    return Response.json({ success: true, blog: savedBlog });
  } catch (error) {
    console.error("Failed to save blog post:", error);
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
      return Response.json({ error: "Blog ID is required." }, { status: 400 });
    }

    const deleted = await deleteBlog(id);

    if (!deleted) {
      return Response.json({ error: "Blog post not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
