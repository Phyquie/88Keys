import { RECAPTCHA_ACTION } from "./recaptcha-shared";

interface Grecaptcha {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const RECAPTCHA_SCRIPT_SRC = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;

/** Waits for the reCAPTCHA script to finish loading. */
function waitForGrecaptcha(timeoutMs: number): Promise<Grecaptcha> {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const poll = () => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha);
      } else if (Date.now() - startedAt > timeoutMs) {
        reject(new Error("reCAPTCHA script did not load"));
      } else {
        setTimeout(poll, 100);
      }
    };

    poll();
  });
}

/**
 * Returns a fresh reCAPTCHA v3 token, or `null` when no site key is configured
 * (local development). Tokens expire after two minutes, so this is called at
 * submit time rather than on mount.
 */
export async function getRecaptchaToken(): Promise<string | null> {
  if (!RECAPTCHA_SITE_KEY) return null;

  const grecaptcha = await waitForGrecaptcha(10_000);

  return new Promise<string>((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
        .then(resolve, reject);
    });
  });
}
