import { saveTeacher, deleteTeacher } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return Response.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const teacherData = await request.json();
    if (
      !teacherData.name ||
      !teacherData.department ||
      !teacherData.role ||
      !teacherData.exp ||
      !teacherData.qualifications ||
      !teacherData.specialization ||
      !teacherData.languages ||
      !teacherData.bio ||
      !teacherData.image
    ) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const saved = await saveTeacher(teacherData);
    return Response.json({ success: true, teacher: saved });
  } catch (error) {
    console.error("Failed to save teacher:", error);
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
      return Response.json({ error: "Teacher ID is required." }, { status: 400 });
    }

    const deleted = await deleteTeacher(id);

    if (!deleted) {
      return Response.json({ error: "Teacher not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete teacher:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
