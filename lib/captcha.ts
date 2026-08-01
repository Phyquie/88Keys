import crypto from "crypto";

const CHARSET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
const CAPTCHA_LENGTH = 5;

// Fallback for local development if CAPTCHA_SECRET is not configured
const SECRET = process.env.CAPTCHA_SECRET || "fallback_development_only_secret_88keys_captcha";

if (!process.env.CAPTCHA_SECRET && process.env.NODE_ENV === "production") {
  console.warn("[captcha] CAPTCHA_SECRET is not set in production. Security may be compromised!");
}

/**
 * Generates a random alphanumeric code of specified length.
 */
function generateRandomCode(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, CHARSET.length);
    result += CHARSET.charAt(randomIndex);
  }
  return result;
}

/**
 * Generates a styled SVG string for a given captcha code.
 */
export function generateCaptchaSvg(code: string): string {
  const width = 150;
  const height = 50;
  
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Background rectangle
  svg += `<rect width="100%" height="100%" fill="#F1E4C8" rx="4"/>`;
  
  // Background grid/noise lines
  for (let i = 0; i < 4; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#B8863B" stroke-width="1.5" opacity="0.35"/>`;
  }
  
  // Noise dots
  for (let i = 0; i < 30; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = Math.random() * 1.5 + 0.5;
    svg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="#17140F" opacity="0.15"/>`;
  }
  
  // Render characters with distortion, rotation, and font changes
  const fontFamilies = ["monospace", "sans-serif", "serif"];
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const fontSize = Math.floor(Math.random() * 5) + 24; // 24 to 28
    const fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
    const x = 15 + i * 24 + Math.random() * 6;
    const y = 32 + Math.random() * 8 - 4; // y coordinates around 28-36
    const rotate = Math.floor(Math.random() * 40) - 20; // -20 to 20 degrees
    const color = Math.random() > 0.4 ? "#17140F" : "#B8863B";
    
    svg += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${fontFamily}" font-size="${fontSize}px" font-weight="bold" fill="${color}" transform="rotate(${rotate} ${x.toFixed(1)} ${y.toFixed(1)})">${char}</text>`;
  }
  
  // Foreground noise lines
  for (let i = 0; i < 2; i++) {
    const x1 = Math.random() * width;
    const y1 = Math.random() * height;
    const x2 = Math.random() * width;
    const y2 = Math.random() * height;
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#17140F" stroke-width="1" opacity="0.25"/>`;
  }
  
  svg += `</svg>`;
  return svg;
}

/**
 * Helper to compute the cryptographic signature.
 */
function computeSignature(answer: string, timestamp: number, salt: string): string {
  const normalized = answer.toLowerCase().trim();
  const data = `${normalized}.${timestamp}.${salt}`;
  return crypto.createHmac("sha256", SECRET).update(data).digest("hex");
}

/**
 * Generates a fresh captcha challenge.
 * Returns the SVG string and a stateless validation token.
 */
export function generateCaptcha(): { svg: string; captchaId: string } {
  const code = generateRandomCode(CAPTCHA_LENGTH);
  const svg = generateCaptchaSvg(code);
  const timestamp = Date.now();
  const salt = crypto.randomBytes(8).toString("hex");
  const signature = computeSignature(code, timestamp, salt);
  
  const captchaId = `${timestamp}.${salt}.${signature}`;
  return { svg, captchaId };
}

/**
 * Verifies the user's answer against the signed captcha token.
 * Validates expiration (5 minutes maximum lifetime).
 */
export function verifyCaptcha(captchaId: string | undefined, answer: string | undefined): boolean {
  if (!captchaId || !answer) return false;
  
  const parts = captchaId.split(".");
  if (parts.length !== 3) return false;
  
  const [timestampStr, salt, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;
  
  // Enforce 5-minute timeout window
  const now = Date.now();
  if (now - timestamp < 0 || now - timestamp > 5 * 60 * 1000) {
    return false;
  }
  
  const expectedSignature = computeSignature(answer, timestamp, salt);
  
  if (signature.length !== expectedSignature.length) {
    return false;
  }
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}
