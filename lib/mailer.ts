export type WaitlistRole = "startup" | "investor" | "developer";

const FROM_ADDRESS = process.env.WAITLIST_FROM_EMAIL || "find@inferect.online";
const FROM_NAME = "The Inferect Team";

interface WaitlistEmailContent {
  subject: string;
  heading: string;
  body: string;
}

interface SendWaitlistEmailParams {
  name: string;
  email: string;
  role: WaitlistRole;
}

export interface SendWaitlistEmailResult {
  delivered: boolean;
  id: string;
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]!);
}

function getEmailContent(role: WaitlistRole, name: string): WaitlistEmailContent {
  const firstName = name.trim().split(/\s+/)[0] || "there";

  if (role === "investor") {
    return {
      subject: "Welcome to Inferect",
      heading: `Welcome to Inferect, ${firstName}`,
      body: "Welcome to Inferect - the world's next billion-dollar AI Frontier Lab. We'll be in touch shortly with the deck and next steps.",
    };
  }

  return {
    subject: "You're in for Inferect v1",
    heading: `You're in, ${firstName}`,
    body: "You're in for v1 of Inferect. Our team will contact you shortly with next steps.",
  };
}

function renderHtml(content: WaitlistEmailContent): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#05060a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#05060a;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#0d1017;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:36px 32px 24px 32px;">
                <span style="font-size:16px;font-weight:600;color:#f2f4f8;letter-spacing:-0.01em;">Inferect</span>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px 32px;">
                <h1 style="margin:0;font-size:22px;line-height:1.3;font-weight:600;color:#f2f4f8;">${escapeHtml(content.heading)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px 32px;">
                <p style="margin:0;font-size:15px;line-height:1.6;color:#9aa3b2;">${escapeHtml(content.body)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 36px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#5b6472;">
                  Inferect - The Intelligence Layer for AI Inference.<br />
                  You're receiving this because you joined the Inferect waitlist.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendWaitlistEmail({
  name,
  email,
  role,
}: SendWaitlistEmailParams): Promise<SendWaitlistEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const content = getEmailContent(role, name);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${FROM_ADDRESS}>`,
      to: [email],
      reply_to: FROM_ADDRESS,
      subject: content.subject,
      html: renderHtml(content),
      text: `${content.heading}\n\n${content.body}`,
    }),
  });

  const result = (await response.json().catch(() => null)) as
    | { id?: string; message?: string; name?: string }
    | null;

  if (!response.ok || !result?.id) {
    throw new Error(
      result?.message || result?.name || `Resend returned HTTP ${response.status}.`
    );
  }

  return { delivered: true, id: result.id };
}
