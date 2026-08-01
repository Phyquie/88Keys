import { cookies } from "next/headers";
import { encryptSession } from "@/lib/auth";
import { UserModel, hashPassword } from "@/lib/db";
import { dbConnect } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return Response.json({ error: "Username and password are required." }, { status: 400 });
    }

    await dbConnect();
    // Look up username case-insensitively
    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (!user) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Verify hashed password using user's salt
    const passwordHash = hashPassword(password, user.salt);
    if (passwordHash !== user.passwordHash) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Enforce role authorization
    if (user.role !== "admin") {
      return Response.json({ error: "Unauthorized access: admin role required." }, { status: 403 });
    }

    const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
    const sessionToken = encryptSession({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
      expiresAt
    });

    const cookieStore = await cookies();
    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Login endpoint error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
