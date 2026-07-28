import { sendBookingEmail, type BookingDetails } from "@/lib/mailer";
import { verifyRecaptcha } from "@/lib/recaptcha-server";

// nodemailer opens a TCP socket, so this handler must run on Node.js.
export const runtime = "nodejs";

const FIELDS = ["name", "email", "phone", "course", "preferredDay", "mode"] as const;
const MAX_LENGTH = 200;

function parseBooking(payload: unknown): BookingDetails | string {
  if (typeof payload !== "object" || payload === null) {
    return "Invalid request body.";
  }

  const body = payload as Record<string, unknown>;
  const booking = {} as BookingDetails;

  for (const field of FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return `Missing required field: ${field}.`;
    }
    if (value.length > MAX_LENGTH) {
      return `Field too long: ${field}.`;
    }
    // Strip newlines so user input can't inject extra mail headers.
    booking[field] = value.replace(/[\r\n]+/g, " ").trim();
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    return "Please enter a valid email address.";
  }

  return booking;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const booking = parseBooking(payload);
  if (typeof booking === "string") {
    return Response.json({ error: booking }, { status: 400 });
  }

  const captchaToken = (payload as Record<string, unknown>).captchaToken;
  const verification = await verifyRecaptcha(
    typeof captchaToken === "string" ? captchaToken : undefined,
    request.headers.get("x-forwarded-for")?.split(",")[0].trim()
  );

  if (!verification.ok) {
    // The reason names our config or Google's error codes — log it, don't ship it.
    console.warn("Booking rejected by reCAPTCHA:", verification.reason);
    return Response.json(
      {
        error:
          "We couldn't verify that you're human. Please refresh the page and try again.",
      },
      { status: 403 }
    );
  }

  try {
    await sendBookingEmail(booking);
  } catch (error) {
    // Keep credentials and SMTP internals out of the client response.
    console.error("Failed to send booking email:", error);
    return Response.json(
      { error: "We couldn't send your booking right now. Please try again or call us." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
