import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.CAPTCHA_SECRET || "admin_secret_fallback_key";

export interface UserSession {
  userId: string;
  username: string;
  role: string;
  expiresAt: number;
}

/**
 * Encrypts/signs a session payload to produce a tamper-proof session token.
 */
export function encryptSession(session: UserSession): string {
  const payload = JSON.stringify(session);
  const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64")}.${signature}`;
}

/**
 * Verifies and decrypts a signed session token. Returns null if invalid or expired.
 */
export function decryptSession(token: string): UserSession | null {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;
    
    const payload = Buffer.from(payloadB64, "base64").toString("utf8");
    const expectedSignature = crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
    if (signature !== expectedSignature) return null;
    
    const session = JSON.parse(payload) as UserSession;
    if (Date.now() > session.expiresAt) return null;
    
    return session;
  } catch (error) {
    console.error("Error decrypting admin session token:", error);
    return null;
  }
}

/**
 * Checks if the request contains a valid session cookie and role is admin.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;
    
    const session = decryptSession(token);
    if (!session) return false;
    
    return session.role === "admin";
  } catch (error) {
    console.error("Error reading admin session cookie:", error);
    return false;
  }
}
