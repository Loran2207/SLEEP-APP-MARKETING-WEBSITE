/**
 * Configure NEWSLETTER_ENDPOINT before launch.
 * The form returns a clear unavailable response until it is connected.
 */

export const runtime = "nodejs";

const INVALID_EMAIL_MESSAGE = "Enter a valid email address.";
const UPSTREAM_ERROR_MESSAGE =
  "We could not reach the mailing list. Try again later.";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let emailValue: unknown;

  try {
    const body: unknown = await request.json();

    if (body && typeof body === "object" && !Array.isArray(body)) {
      emailValue = (body as { email?: unknown }).email;
    }
  } catch {
    return Response.json(
      { error: INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  if (typeof emailValue !== "string") {
    return Response.json(
      { error: INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  const email = emailValue.trim();

  if (email.length === 0 || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return Response.json(
      { error: INVALID_EMAIL_MESSAGE },
      { status: 400 },
    );
  }

  const endpoint = process.env.NEWSLETTER_ENDPOINT;

  if (!endpoint) {
    return Response.json(
      { error: "Subscribing is not connected yet." },
      { status: 503 },
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const apiKey = process.env.NEWSLETTER_API_KEY;

  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  try {
    const upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ email }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstreamResponse.ok) {
      return Response.json(
        { error: UPSTREAM_ERROR_MESSAGE },
        { status: 502 },
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json(
      { error: UPSTREAM_ERROR_MESSAGE },
      { status: 502 },
    );
  }
}
