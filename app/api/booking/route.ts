import { sendBookingEmail, type BookingDetails } from "@/lib/mailer";
import { verifyCaptcha } from "@/lib/captcha";
import { saveBooking } from "@/lib/db";

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

  const requiredFields = ["name", "email", "phone", "course"] as const;
  for (const field of requiredFields) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return `Missing required field: ${field}.`;
    }
    if (value.length > MAX_LENGTH) {
      return `Field too long: ${field}.`;
    }
    booking[field] = value.replace(/[\r\n]+/g, " ").trim();
  }

  // Optional/Defaulted fields
  const preferredDayVal = body.preferredDay;
  booking.preferredDay = typeof preferredDayVal === "string" && preferredDayVal.trim() !== ""
    ? preferredDayVal.replace(/[\r\n]+/g, " ").trim()
    : "Any Day";

  const modeVal = body.mode;
  booking.mode = typeof modeVal === "string" && modeVal.trim() !== ""
    ? modeVal.replace(/[\r\n]+/g, " ").trim()
    : "Contact Form Inquiry";

  const messageVal = body.message;
  if (typeof messageVal === "string" && messageVal.trim() !== "") {
    booking.message = messageVal.substring(0, 1000).trim();
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

  const { captchaAnswer, captchaId } = payload as Record<string, unknown>;
  const isCaptchaValid = verifyCaptcha(
    typeof captchaId === "string" ? captchaId : undefined,
    typeof captchaAnswer === "string" ? captchaAnswer : undefined
  );

  if (!isCaptchaValid) {
    console.warn("Booking rejected: invalid or expired captcha.");
    return Response.json(
      {
        error: "Security check failed. Please enter the correct code shown in the image.",
      },
      { status: 400 }
    );
  }

  // Save the booking to MongoDB database for the admin panel
  try {
    await saveBooking(booking);
  } catch (dbError) {
    console.error("Failed to save booking to database:", dbError);
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
