import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { validateContactForm } from "@/lib/contact/validation";
import { checkContactRateLimit } from "@/lib/contact/rateLimit";
import { sendContactEmail } from "@/lib/contact/mail";

export const runtime = "nodejs";

const MAX_BODY_SIZE = 32 * 1024;

function jsonResponse(
  data: Record<string, unknown>,
  status: number,
  headers?: Record<string, string>
) {
  return NextResponse.json(data, {
    status,

    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function rateLimitResponse(retryAfter: number) {
  return jsonResponse(
    {
      ok: false,
      code: "rateLimit",
    },
    429,
    {
      "Retry-After": String(retryAfter),
    }
  );
}

async function readLimitedJson(
  request: Request
): Promise<unknown> {
  if (!request.body) {
    throw new Error("INVALID_BODY");
  }

  const reader = request.body.getReader();

  const decoder = new TextDecoder("utf-8", {
    fatal: true,
  });

  let size = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      size += value.byteLength;

      if (size > MAX_BODY_SIZE) {
        await reader.cancel();

        throw new Error("BODY_TOO_LARGE");
      }

      body += decoder.decode(value, {
        stream: true,
      });
    }

    body += decoder.decode();

    return JSON.parse(body);
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  // 01 — Contact form availability
  if (process.env.CONTACT_FORM_ENABLED !== "true") {
    return jsonResponse(
      {
        ok: false,
        code: "unavailable",
      },
      503
    );
  }

  // 02 — Origin verification
  const allowedOrigin =
    process.env.CONTACT_ALLOWED_ORIGIN;

  const origin = request.headers.get("origin");

  if (!allowedOrigin || origin !== allowedOrigin) {
    return jsonResponse(
      {
        ok: false,
        code: "forbidden",
      },
      403
    );
  }

  // 03 — Fetch metadata verification
  const fetchSite =
    request.headers.get("sec-fetch-site");

  if (
    fetchSite &&
    fetchSite !== "same-origin"
  ) {
    return jsonResponse(
      {
        ok: false,
        code: "forbidden",
      },
      403
    );
  }

  // 04 — Content-Type verification
  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return jsonResponse(
      {
        ok: false,
        code: "invalidContentType",
      },
      415
    );
  }

  // 05 — Content-Length verification
  const contentLength =
    request.headers.get("content-length");

  if (
    contentLength !== null &&
    Number(contentLength) > MAX_BODY_SIZE
  ) {
    return jsonResponse(
      {
        ok: false,
        code: "payloadTooLarge",
      },
      413
    );
  }

  // 06 — Global rate limit
  const globalLimit =
    checkContactRateLimit("contact:global", 20);

  if (!globalLimit.allowed) {
    return rateLimitResponse(
      globalLimit.retryAfter
    );
  }

  // 07 — Request body parsing
  let payload: unknown;

  try {
    payload = await readLimitedJson(request);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "BODY_TOO_LARGE"
    ) {
      return jsonResponse(
        {
          ok: false,
          code: "payloadTooLarge",
        },
        413
      );
    }

    return jsonResponse(
      {
        ok: false,
        code: "invalidBody",
      },
      400
    );
  }

  // 08 — Honeypot verification
  if (
    typeof payload === "object" &&
    payload !== null &&
    "website" in payload &&
    payload.website !== ""
  ) {
    return jsonResponse(
      {
        ok: false,
        code: "invalidBody",
      },
      400
    );
  }

  // 09 — Server-side validation
  const validation =
    validateContactForm(payload);

  if (!validation.ok) {
    return jsonResponse(
      {
        ok: false,
        code: "validation",
        errors: validation.errors,
      },
      422
    );
  }

  // 10 — Email-based rate limit
  const emailHash = createHash("sha256")
    .update(
      validation.data.email.toLowerCase()
    )
    .digest("hex");

  const emailLimit = checkContactRateLimit(
    `contact:email:${emailHash}`,
    3
  );

  if (!emailLimit.allowed) {
    return rateLimitResponse(
      emailLimit.retryAfter
    );
  }

  // 11 — SMTP email delivery
  try {
    await sendContactEmail(validation.data);

    return jsonResponse(
      {
        ok: true,
        code: "success",
      },
      200
    );
  } catch {
    console.error(
      "[Contact API] SMTP submission failed."
    );

    return jsonResponse(
      {
        ok: false,
        code: "unavailable",
      },
      503
    );
  }
}