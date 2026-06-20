import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

async function sendNotification(fields: {
  name: string;
  email: string;
  lead_type: string | null;
  source: string;
  details: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;

  console.log("[leads] sendNotification called:", {
    RESEND_API_KEY_exists: Boolean(apiKey),
    RESEND_TO_EMAIL_exists: Boolean(toEmail),
    lead_type: fields.lead_type,
  });

  if (!apiKey || !toEmail) {
    console.warn("[leads] sendNotification aborted: missing env vars.");
    return;
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const label = fields.lead_type ?? "lead";
  const subject = `New ${label} — ${fields.name || fields.email}`;

  const rows = [
    ["Type", label],
    ["Name", fields.name || "(not provided)"],
    ["Email", fields.email],
    ["Source", fields.source],
    ...(fields.details ? [["Details", fields.details] as [string, string]] : []),
    ["Time", new Date().toISOString()],
  ];

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#9ca3af;font-size:13px;white-space:nowrap;">${k}</td><td style="padding:6px 12px;color:#f9fafb;font-size:13px;">${v}</td></tr>`
    )
    .join("");

  const html = `
    <div style="background:#0b0f1a;min-height:100vh;padding:40px 20px;font-family:sans-serif;">
      <div style="max-width:520px;margin:0 auto;background:#111827;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
        <div style="background:#1d4ed8;padding:20px 24px;">
          <p style="margin:0;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Digital Wealth Transfer</p>
          <p style="margin:4px 0 0;color:#bfdbfe;font-size:18px;font-weight:700;">New ${label}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${tableRows}
        </table>
        <div style="padding:16px 24px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;color:#6b7280;font-size:11px;">Sent by DWT lead system · digitalwealthtransfer.com</p>
        </div>
      </div>
    </div>
  `;

  try {
    const result = await resend.emails.send({ from, to: toEmail, subject, html });
    if (result.error) {
      throw new Error(result.error.message);
    }
    console.log("[leads] Resend success:", { id: result.data?.id ?? "(no id returned)" });
  } catch (e) {
    console.error("[leads] Resend send failed:", e instanceof Error ? e.message : e);
    throw e;
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, string>;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid or empty request body" }, { status: 400 });
    }

    const {
      name,
      email,
      service,
      companySlug,
      lead_type,
      businessName,
      website,
      budgetRange,
      platform,
      idealClient,
      sourcePage,
      message,
    } = body;

    // Only email is required — name and companySlug are optional (newsletter has neither)
    if (!email) {
      return Response.json({ error: "email is required" }, { status: 422 });
    }

    const resolvedName = name?.trim() || "";
    const resolvedSlug = companySlug?.trim() || lead_type || "dwt";

    // Build enriched service string from any extra fields passed
    const extras: string[] = [];
    if (service) extras.push(service);
    if (businessName) extras.push(`Business: ${businessName}`);
    if (website) extras.push(`Website: ${website}`);
    if (budgetRange) extras.push(`Budget: ${budgetRange}`);
    if (platform) extras.push(`Platform(s): ${platform}`);
    if (idealClient) extras.push(`Ideal Client: ${idealClient}`);
    if (sourcePage) extras.push(`Source: ${sourcePage}`);
    if (message) extras.push(`Notes: ${message}`);
    const enrichedService = extras.join(" | ") || null;

    console.log("[leads] New submission:", {
      lead_type: lead_type ?? "unknown",
      timestamp: new Date().toISOString(),
    });

    console.log("[leads] Resend env check:", {
      RESEND_API_KEY_exists: Boolean(process.env.RESEND_API_KEY),
      RESEND_TO_EMAIL_exists: Boolean(process.env.RESEND_TO_EMAIL),
    });

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name: resolvedName,
          email: email.trim().toLowerCase(),
          service: enrichedService,
          company_slug: resolvedSlug,
          lead_type: lead_type ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      // If lead_type column doesn't exist yet, retry without it
      if (error.message.includes("lead_type")) {
        console.warn("[leads] lead_type column missing — retrying without it.");
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("leads")
          .insert([
            {
              name: resolvedName,
              email: email.trim().toLowerCase(),
              service: enrichedService,
              company_slug: resolvedSlug,
            },
          ])
          .select()
          .single();

        if (fallbackError) {
          console.error("[leads] Supabase fallback insert error:", fallbackError);
          return Response.json({ error: fallbackError.message }, { status: 500 });
        }

        // Send notification (awaited — serverless requires resolution before response)
        try {
          await sendNotification({
            name: resolvedName,
            email: email.trim().toLowerCase(),
            lead_type: lead_type ?? null,
            source: resolvedSlug,
            details: enrichedService,
          });
        } catch (e) {
          console.error("[leads] Resend notification failed:", e instanceof Error ? e.message : e);
        }

        return Response.json({ success: true, leadId: fallbackData.id }, { status: 201 });
      }

      console.error("[leads] Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Send notification (awaited — serverless requires resolution before response)
    try {
      await sendNotification({
        name: resolvedName,
        email: email.trim().toLowerCase(),
        lead_type: lead_type ?? null,
        source: resolvedSlug,
        details: enrichedService,
      });
    } catch (e) {
      console.error("[leads] Resend notification failed:", e instanceof Error ? e.message : e);
    }

    return Response.json({ success: true, leadId: data.id }, { status: 201 });
  } catch (err) {
    console.error("[leads] Unhandled POST error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ error: "Not found" }, { status: 404 });
}
