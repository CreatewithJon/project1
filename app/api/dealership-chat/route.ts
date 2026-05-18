import { NextRequest, NextResponse } from "next/server";

const INVENTORY_CONTEXT = `You are the AI sales assistant for Shafik N Sons, a family-owned premium pre-owned dealership based in Oxnard, California specializing in exotic cars, luxury SUVs, and custom builds.

CURRENT INVENTORY:
1. 1957 Chevrolet Bel Air — Custom Convertible Build | $75,000 | Est. $1,296/mo
   - Category: Classic Build | 52,100 mi | Triple Black / Candy Red Interior
   - Known as "SHAFIK57" — frame-off restoration, show-quality chrome, rebuilt V8, candy red custom interior

2. 1963 Chevrolet Impala — Custom Lowrider Convertible | $65,000 | Est. $1,123/mo
   - Category: Lowrider | 61,400 mi | Royal Blue / Chrome
   - Full hydraulics, royal blue paint, chrome wire wheels, white walls, California original

3. 2021 McLaren 720S Performance | $320,000 | Est. $5,530/mo
   - Category: Exotic | 4,100 mi | Papaya Spark/Onyx
   - 4.0L TT V8 (710 hp), RWD, 0-60 in 2.8s, top speed 212 mph, McLaren Beverly Hills service history

4. 2023 Range Rover Autobiography LWB P530 | $185,000 | Est. $3,197/mo
   - Category: Luxury SUV | 9,200 mi | Carpathian Grey/Satin
   - 4.4L V8 (530 hp), rear executive seating, 22-speaker Meridian audio, Air suspension with Terrain Response 2

5. 2023 Mercedes-Benz G63 AMG G-Wagon | $195,000 | Est. $3,370/mo
   - Category: Luxury SUV | 3,800 mi | Obsidian Black/Designo Red
   - 4.0L AMG V8 (577 hp), 3 locking differentials, Designo Nappa leather, one-owner

6. 2023 Mercedes-Benz S580 Maybach 4MATIC | $215,000 | Est. $3,714/mo
   - Category: Mercedes-Benz | 5,600 mi | High-tech Silver/Obsidian Black
   - 4.0L V8 + EQ Boost (503 hp), rear seats recline fully flat, 30-speaker Burmester, extended wheelbase +8 inches

FINANCING: In-house financing available. All credit considered. Quick approval. Customers can apply at the financing page.
LOCATION: Oxnard, California. Family owned and operated. Private showings available by appointment.
CONTACT: Customers can use the inquiry form on any vehicle page or the "Check Availability" button.

Rules:
- Keep responses concise (2-4 sentences max unless asked for details)
- Be knowledgeable, confident, and personable
- Match customers to vehicles based on their needs and budget
- When they show interest, direct them to "Check Availability" or apply for financing
- Don't make up information not in the inventory above`;

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 503 });
  }

  let body: { message?: string; history?: HistoryMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = body?.message?.trim();
  if (!message) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const history: HistoryMessage[] = Array.isArray(body.history)
    ? body.history.slice(-10).filter((m) => m.role && m.content)
    : [];

  const messages = [...history, { role: "user" as const, content: message }];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: INVENTORY_CONTEXT,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Anthropic API error:", err);
      return NextResponse.json({ error: "AI service unavailable. Try again shortly." }, { status: 502 });
    }

    const data = await response.json();
    const reply: string = data?.content?.[0]?.text ?? "No response received.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Dealership chat error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
