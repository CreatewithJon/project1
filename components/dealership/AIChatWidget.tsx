"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

const STARTERS = [
  "What exotics do you have?",
  "Tell me about financing options",
  "Which car has the lowest mileage?",
];

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Stop pulsing after user opens once
  useEffect(() => {
    if (open) setPulse(false);
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg = text.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    // Build history for context (only role+content)
    const history = messages
      .filter((m) => !m.error)
      .map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch("/api/dealership-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error ?? "Something went wrong.", error: true },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Try again.", error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Sales Assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #C9A84C, #FDBA74)",
          boxShadow: open
            ? "0 0 0 4px rgba(201,168,76,0.2), 0 20px 60px rgba(0,0,0,0.6)"
            : "0 0 0 0px rgba(201,168,76,0.2), 0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Pulse ring */}
        {pulse && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-40"
            style={{ background: "rgba(201,168,76,0.5)" }}
          />
        )}
        {open ? (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-black">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 21l3.977-.875A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.073-1.115l-.29-.174-2.36.52.526-2.3-.19-.3A7.958 7.958 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right"
        style={{
          background: "#0D0D0D",
          border: "1px solid rgba(201,168,76,0.2)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03)",
          maxHeight: open ? 520 : 0,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "scale(1)" : "scale(0.95)",
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(201,168,76,0.04)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))",
                border: "1px solid rgba(201,168,76,0.35)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#C9A84C]">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 21l3.977-.875A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Elite AI Assistant</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-white/35 text-[11px]">Online · Knows full inventory</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="text-[10px] px-2 py-1 rounded-lg text-white/25 hover:text-white/50 transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: 340 }}>
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-white/30 text-xs leading-relaxed">
                Ask me about our inventory, financing, or schedule a private showing.
              </p>
              <div className="flex flex-col gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-xs text-white/50 hover:text-white/80 px-3 py-2.5 rounded-xl transition-all"
                    style={{
                      background: "rgba(201,168,76,0.05)",
                      border: "1px solid rgba(201,168,76,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(201,168,76,0.28)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.05)";
                      (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(201,168,76,0.15)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div
                  className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: "rgba(201,168,76,0.15)",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#C9A84C]">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 21l3.977-.875A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                </div>
              )}
              <div
                className="max-w-[80%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.85)",
                        borderTopRightRadius: 4,
                      }
                    : msg.error
                    ? {
                        background: "rgba(248,113,113,0.06)",
                        border: "1px solid rgba(248,113,113,0.12)",
                        color: "rgba(255,255,255,0.45)",
                        borderTopLeftRadius: 4,
                      }
                    : {
                        background: "rgba(201,168,76,0.07)",
                        border: "1px solid rgba(201,168,76,0.12)",
                        color: "rgba(255,255,255,0.7)",
                        borderTopLeftRadius: 4,
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 justify-start">
              <div
                className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#C9A84C]">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.546 21l3.977-.875A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </div>
              <div
                className="px-3.5 py-2.5 rounded-xl flex items-center gap-1.5"
                style={{
                  background: "rgba(201,168,76,0.07)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderTopLeftRadius: 4,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "rgba(201,168,76,0.6)", animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="px-4 py-3 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a vehicle..."
              className="flex-1 bg-transparent text-xs text-white/70 placeholder:text-white/20 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-20"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #FDBA74)",
                boxShadow: input.trim() ? "0 0 12px rgba(201,168,76,0.35)" : "none",
              }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="black" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path d="M7 11.5V2.5M3 6.5l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
          <p className="text-center text-[10px] text-white/15 mt-2">
            Powered by AI · Shafik N Sons
          </p>
        </div>
      </div>
    </>
  );
}
