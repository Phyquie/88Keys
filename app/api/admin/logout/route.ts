import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "", {
      httpOnly: true,
      expires: new Date(0), // Set to past to expire immediately
      path: "/",
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return Response.json({ error: "Failed to logout session." }, { status: 500 });
  }
}
