import { NextResponse } from "next/server";
import { sendWaitlistEmail, type WaitlistRole } from "@/lib/mailer";

const VALID_ROLES: WaitlistRole[] = ["startup", "investor", "developer"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: { name?: unknown; email?: unknown; role?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const role = typeof payload.role === "string" ? payload.role : "";

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (name.length > 100) {
    return NextResponse.json({ error: "Please enter a shorter name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!VALID_ROLES.includes(role as WaitlistRole)) {
    return NextResponse.json({ error: "Please select who you are." }, { status: 400 });
  }

  try {
    const result = await sendWaitlistEmail({ name, email, role: role as WaitlistRole });
    return NextResponse.json({ success: true, delivered: result.delivered });
  } catch (error) {
    console.error("[waitlist] Failed to send confirmation email:", error);
    return NextResponse.json(
      { error: "We couldn't send your confirmation email. Please try again shortly." },
      { status: 502 }
    );
  }
}
