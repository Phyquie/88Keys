import { getBlogs, getBookings } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLogin />;
  }

  // Fetch data directly on the server
  const bookings = await getBookings();
  const blogs = await getBlogs();

  return <AdminDashboard initialBookings={bookings} initialBlogs={blogs} />;
}
