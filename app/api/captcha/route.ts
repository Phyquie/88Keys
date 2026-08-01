import { generateCaptcha } from "@/lib/captcha";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { svg, captchaId } = generateCaptcha();
    return Response.json({ svg, captchaId });
  } catch (error) {
    console.error("Failed to generate captcha:", error);
    return Response.json({ error: "Failed to generate security check." }, { status: 500 });
  }
}
