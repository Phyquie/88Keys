import { getBlogs } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const blogs = await getBlogs();
    
    if (id) {
      const blog = blogs.find(b => b.id === id);
      if (!blog) {
        return Response.json({ error: "Blog post not found." }, { status: 404 });
      }
      return Response.json(blog);
    }
    
    return Response.json(blogs);
  } catch (error) {
    console.error("Failed to load public blogs:", error);
    return Response.json({ error: "Failed to load blog posts." }, { status: 500 });
  }
}
