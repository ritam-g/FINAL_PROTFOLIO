import { NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// In-memory rate limiter
// NOTE: This resets on every server restart and is NOT shared across multiple
// serverless instances. For a personal portfolio with low traffic this is fine.
// For production at scale, replace with Redis-backed rate limiting (e.g. Upstash).
// ---------------------------------------------------------------------------
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;          // max submissions
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT) return false; // blocked

  entry.count += 1;
  return true; // allowed
}

// ---------------------------------------------------------------------------
// Email validation
// ---------------------------------------------------------------------------
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------------------------------------------------------------------------
// HTML email template
// ---------------------------------------------------------------------------
function buildHtml(name: string, email: string, message: string): string {
  return `
<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
    <h2 style="margin-top: 0; color: #111;">New Portfolio Message</h2>
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; background: #f5f5f5; padding: 16px; border-radius: 6px;">${message}</p>
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
    <p style="color: #888; font-size: 12px;">Sent via portfolio contact form · ritammaty.dev</p>
  </body>
</html>
  `.trim();
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  // --- Rate limit by IP ---
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  // --- Parse body ---
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, website } = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
  };

  // --- Honeypot: silently succeed if filled by a bot ---
  if (website) {
    return NextResponse.json({ success: true });
  }

  // --- Server-side validation ---
  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email?.trim()) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (!isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!message?.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  // --- Send via Resend ---
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["ritammaty@gmail.com"],
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${name.trim()}`,
      html: buildHtml(name.trim(), email.trim(), message.trim()),
    });

    if (error) {
      console.error("[contact] Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
