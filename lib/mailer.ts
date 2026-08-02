import nodemailer from "nodemailer";

/**
 * SMTP config read from the environment. See `.env.example` for the full list —
 * `SMTP_PASS` must be an app password, not the account's login password.
 */
function readSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  // App passwords are shown in groups of four; strip the spaces and any surrounding quotes
  // so a pasted value works as-is.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "").replace(/['"]/g, "");

  const missing = [
    ["SMTP_HOST", host],
    ["SMTP_USER", user],
    ["SMTP_PASS", pass],
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing SMTP environment variable(s): ${missing.join(", ")}. Copy .env.example to .env.local and fill them in.`
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid SMTP_PORT: ${process.env.SMTP_PORT}`);
  }

  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return {
    host: host!,
    port,
    secure,
    user: user!,
    pass: pass!,
    to: process.env.MAIL_TO
      ? process.env.MAIL_TO.split(",").map((email) => email.trim()).filter(Boolean).join(", ")
      : user!,
    from: process.env.MAIL_FROM || `88 Keys Studio <${user}>`,
  };
}

// Reused across requests so we don't open a new SMTP connection per booking.
let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(config: ReturnType<typeof readSmtpConfig>) {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
  }
  return cachedTransporter;
}

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  course: string;
  preferredDay: string;
  mode: string;
  message?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(booking: BookingDetails) {
  const rows: Array<[string, string]> = [
    ["Name", booking.name],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["Program", booking.course],
    ["Learning Mode", booking.mode],
    ["Preferred Day", booking.preferredDay],
  ];

  if (booking.message) {
    rows.push(["Message", booking.message]);
  }

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;background:#F7F2E7;padding:24px;color:#17140F">
      <h2 style="margin:0 0 4px;font-size:18px">New Consultation / Enquiry Request</h2>
      <p style="margin:0 0 16px;font-size:13px;color:#4A4335">
        Submitted from the 88 Keys Studio website.
      </p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;background:#fff">
        ${rows
      .map(
        ([label, value]) => `<tr>
          <td style="border:1px solid #17140F1a;font-weight:600;white-space:nowrap">${escapeHtml(label)}</td>
          <td style="border:1px solid #17140F1a">${escapeHtml(value)}</td>
        </tr>`
      )
      .join("")}
      </table>
    </div>
  `;

  return { text, html };
}

/** Emails a consult/enquiry booking to the studio inbox. Throws if SMTP is misconfigured. */
export async function sendBookingEmail(booking: BookingDetails) {
  const config = readSmtpConfig();
  const { text, html } = buildEmail(booking);

  console.log(`[Mailer] Sending booking email:
    - From: ${config.from}
    - To: ${config.to} (configured via MAIL_TO / SMTP_USER)
    - Reply-To: ${booking.name} <${booking.email}>
    - Subject: New Consult/Enquiry — ${booking.course} (${booking.name})`);

  await getTransporter(config).sendMail({
    from: config.from,
    to: config.to,
    // Replying in the inbox goes straight back to the prospective student.
    replyTo: `${booking.name} <${booking.email}>`,
    subject: `New Consult/Enquiry — ${booking.course} (${booking.name})`,
    text,
    html,
  });
}
