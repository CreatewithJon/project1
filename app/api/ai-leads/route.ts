import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, string>;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid or empty request body" }, { status: 400 });
    }

    const { name, email, business_name, website, industry, service_need, budget, message } = body;

    if (!name || !email) {
      return Response.json({ error: "name and email are required" }, { status: 422 });
    }

    console.log("[ai-leads] New submission:", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      business_name,
      service_need,
      budget,
      timestamp: new Date().toISOString(),
    });

    const supabase = getSupabase();

    // Write to ai_leads (full detail record)
    const { data, error } = await supabase
      .from("ai_leads")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          business_name: business_name?.trim() ?? null,
          website: website?.trim() ?? null,
          industry: industry?.trim() ?? null,
          service_need: service_need ?? null,
          budget: budget ?? null,
          message: message?.trim() ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("[ai-leads] Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    // Also write to leads table so it shows up in the Lead Engine CRM
    const serviceSummary = [
      service_need,
      industry ? `Industry: ${industry}` : null,
      budget ? `Budget: ${budget}` : null,
      business_name ? `Business: ${business_name}` : null,
      website ? `Website: ${website}` : null,
      message ? `Notes: ${message}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    const { error: leadsError } = await supabase.from("leads").insert([
      {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        service: serviceSummary || "AI Systems Inquiry",
        company_slug: "ai-systems",
        lead_type: "ai_systems",
      },
    ]);

    if (leadsError) {
      // Non-fatal — ai_leads already saved, just log the sync failure
      console.error("[ai-leads] Failed to mirror to leads table:", leadsError);
    }

    // Send notification (non-blocking)
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL;
    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
      const rows = [
        ["Name", name.trim()],
        ["Email", email.trim().toLowerCase()],
        ["Business", business_name ?? "(not provided)"],
        ["Website", website ?? "(not provided)"],
        ["Industry", industry ?? "(not provided)"],
        ["Need", service_need ?? "(not provided)"],
        ["Budget", budget ?? "(not provided)"],
        ...(message ? [["Notes", message] as [string, string]] : []),
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
              <p style="margin:4px 0 0;color:#bfdbfe;font-size:18px;font-weight:700;">New AI Systems Inquiry</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
            <div style="padding:16px 24px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;color:#6b7280;font-size:11px;">Sent by DWT lead system · digitalwealthtransfer.com</p>
            </div>
          </div>
        </div>`;
      resend.emails
        .send({ from, to: toEmail, subject: `New AI Systems Inquiry — ${name.trim()} (${email.trim().toLowerCase()})`, html })
        .catch((e: unknown) => console.error("[ai-leads] Resend notification failed:", e));
    }

    return Response.json({ success: true, leadId: data.id }, { status: 201 });
  } catch (err) {
    console.error("[ai-leads] Unhandled error:", err);
    return Response.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
