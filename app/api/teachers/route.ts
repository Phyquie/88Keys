import { getTeachers, seedTeachersIfEmpty } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department") || undefined;

    // Seed defaults if empty
    await seedTeachersIfEmpty();

    const teachers = await getTeachers(department ? { department } : {});
    return Response.json(teachers);
  } catch (error) {
    console.error("Failed to load teachers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
