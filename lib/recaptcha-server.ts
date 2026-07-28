import { RECAPTCHA_ACTION } from "./recaptcha-shared";

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const DEFAULT_MIN_SCORE = 0.5;

interface SiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export type VerifyResult =
  | { ok: true; skipped: boolean; score?: number }
  | { ok: false; reason: string };

/**
 * Verifies a reCAPTCHA v3 token with Google.
 *
 * With no secret configured this skips verification in development so the form
 * still works locally, but fails closed in production — an unconfigured deploy
 * must not silently accept unverified submissions.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  remoteIp?: string
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, reason: "RECAPTCHA_SECRET_KEY is not set" };
    }
    console.warn(
      "[recaptcha] RECAPTCHA_SECRET_KEY not set — skipping verification (development only)."
    );
    return { ok: true, skipped: true };
  }

  if (!token) {
    return { ok: false, reason: "missing token" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  let data: SiteVerifyResponse;
  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      // Don't let a slow Google response hang the booking request.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return { ok: false, reason: `siteverify returned HTTP ${res.status}` };
    }
    data = (await res.json()) as SiteVerifyResponse;
  } catch (error) {
    return {
      ok: false,
      reason: `siteverify request failed: ${(error as Error).message}`,
    };
  }

  if (!data.success) {
    return {
      ok: false,
      reason: `rejected: ${data["error-codes"]?.join(", ") ?? "unknown"}`,
    };
  }

  // A valid token from a different action means it was replayed from elsewhere.
  if (data.action !== RECAPTCHA_ACTION) {
    return { ok: false, reason: `unexpected action: ${data.action}` };
  }

  const parsedMin = Number(process.env.RECAPTCHA_MIN_SCORE);
  const minScore =
    Number.isFinite(parsedMin) && parsedMin >= 0 && parsedMin <= 1
      ? parsedMin
      : DEFAULT_MIN_SCORE;
  const score = data.score ?? 0;

  if (score < minScore) {
    return { ok: false, reason: `score ${score} below threshold ${minScore}` };
  }

  return { ok: true, skipped: false, score };
}
