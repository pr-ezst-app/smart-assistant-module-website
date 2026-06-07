import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Settings {
  tone: "professional" | "casual" | "expert";
  length: "concise" | "balanced" | "detailed";
  expertise: "beginner" | "intermediate" | "expert";
}

interface ChatPageProps {
  onBack: () => void;
}

const TONE_LABELS: Record<string, string> = {
  professional: "Professional",
  casual: "Casual",
  expert: "Expert",
};
const LENGTH_LABELS: Record<string, string> = {
  concise: "Concise",
  balanced: "Balanced",
  detailed: "Detailed",
};
const EXPERTISE_LABELS: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Mid-level",
  expert: "Expert",
};

export default function ChatPage({ onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm S.A.M — your Smart Assistant Module. I'm here to help you with any question, task, or topic. What would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    tone: "professional",
    length: "balanced",
    expertise: "intermediate",
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://functions.poehali.dev/0d4b1996-762e-490f-a00c-20f7cb0d545d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          settings,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-ai",
          role: "assistant",
          content: data.reply || "I encountered an issue. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-err",
          role: "assistant",
          content: "Connection error. Please check your setup and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--sam-bg)" }}>
      {/* Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb w-[400px] h-[400px] top-[-100px] left-[-100px] opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", animation: "orb-drift 12s ease-in-out infinite" }} />
        <div className="orb w-[300px] h-[300px] bottom-[-80px] right-[-80px] opacity-15"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)", animation: "orb-drift 15s ease-in-out infinite reverse" }} />
      </div>

      {/* Header */}
      <div className="sam-nav relative z-20 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(99, 102, 241, 0.1)", border: "1px solid rgba(99, 102, 241, 0.2)" }}
            >
              <Icon name="ArrowLeft" size={16} style={{ color: "var(--sam-violet)" }} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
                <span className="text-xs font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>S</span>
              </div>
              <div>
                <div className="font-bold text-sm text-white" style={{ fontFamily: "'Syne', sans-serif" }}>S.A.M</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active settings badges */}
            <div className="hidden md:flex items-center gap-2">
              {[
                { val: TONE_LABELS[settings.tone], color: "var(--sam-violet)" },
                { val: LENGTH_LABELS[settings.length], color: "var(--sam-cyan)" },
                { val: EXPERTISE_LABELS[settings.expertise], color: "var(--sam-pink)" },
              ].map((b) => (
                <span key={b.val} className="px-2 py-1 rounded-md text-xs" style={{ fontFamily: "'Space Mono', monospace", background: `${b.color}15`, color: b.color, border: `1px solid ${b.color}30` }}>
                  {b.val}
                </span>
              ))}
            </div>
            <button
              onClick={() => setShowSettings((s) => !s)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{
                background: showSettings ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
                border: `1px solid ${showSettings ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.2)"}`,
              }}
            >
              <Icon name="SlidersHorizontal" size={16} style={{ color: "var(--sam-violet)" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="relative z-20 flex-shrink-0 border-b" style={{ borderColor: "rgba(99,102,241,0.15)", background: "rgba(5,8,17,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Tone */}
              <div>
                <label className="text-xs mb-2 block" style={{ color: "var(--sam-violet)", fontFamily: "'Space Mono', monospace" }}>Tone</label>
                <div className="flex gap-2">
                  {(["professional", "casual", "expert"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSettings((s) => ({ ...s, tone: t }))}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: settings.tone === t ? "rgba(129,140,248,0.25)" : "rgba(99,102,241,0.08)",
                        border: `1px solid ${settings.tone === t ? "rgba(129,140,248,0.6)" : "rgba(99,102,241,0.2)"}`,
                        color: settings.tone === t ? "var(--sam-violet)" : "var(--sam-muted)",
                      }}
                    >
                      {TONE_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div>
                <label className="text-xs mb-2 block" style={{ color: "var(--sam-cyan)", fontFamily: "'Space Mono', monospace" }}>Length</label>
                <div className="flex gap-2">
                  {(["concise", "balanced", "detailed"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setSettings((s) => ({ ...s, length: l }))}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: settings.length === l ? "rgba(34,211,238,0.2)" : "rgba(34,211,238,0.05)",
                        border: `1px solid ${settings.length === l ? "rgba(34,211,238,0.5)" : "rgba(34,211,238,0.15)"}`,
                        color: settings.length === l ? "var(--sam-cyan)" : "var(--sam-muted)",
                      }}
                    >
                      {LENGTH_LABELS[l]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div>
                <label className="text-xs mb-2 block" style={{ color: "var(--sam-pink)", fontFamily: "'Space Mono', monospace" }}>Expertise</label>
                <div className="flex gap-2">
                  {(["beginner", "intermediate", "expert"] as const).map((e) => (
                    <button
                      key={e}
                      onClick={() => setSettings((s) => ({ ...s, expertise: e }))}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: settings.expertise === e ? "rgba(244,114,182,0.2)" : "rgba(244,114,182,0.05)",
                        border: `1px solid ${settings.expertise === e ? "rgba(244,114,182,0.5)" : "rgba(244,114,182,0.15)"}`,
                        color: settings.expertise === e ? "var(--sam-pink)" : "var(--sam-muted)",
                      }}
                    >
                      {EXPERTISE_LABELS[e]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex gap-3 animate-fadeIn"
              style={{ justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1"
                  style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
                  <span className="text-xs font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>S</span>
                </div>
              )}
              <div
                className="max-w-[80%] md:max-w-[70%] px-5 py-4 rounded-2xl"
                style={{
                  ...(msg.role === "user"
                    ? { background: "linear-gradient(135deg, rgba(129,140,248,0.2), rgba(34,211,238,0.1))", border: "1px solid rgba(129,140,248,0.3)", borderTopRightRadius: "4px" }
                    : { background: "rgba(17,24,39,0.8)", border: "1px solid rgba(99,102,241,0.15)", borderTopLeftRadius: "4px" }),
                }}
              >
                <p className="leading-relaxed whitespace-pre-wrap" style={{ color: "var(--sam-text)", fontFamily: "'Space Mono', monospace", fontSize: "14px" }}>
                  {msg.content}
                </p>
                <p className="mt-2 text-right" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace", fontSize: "10px" }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1"
                  style={{ background: "rgba(129,140,248,0.2)", border: "1px solid rgba(129,140,248,0.3)" }}>
                  <Icon name="User" size={14} style={{ color: "var(--sam-violet)" }} />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 animate-fadeIn">
              <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
                <span className="text-xs font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>S</span>
              </div>
              <div className="px-5 py-4 rounded-2xl" style={{ background: "rgba(17,24,39,0.8)", border: "1px solid rgba(99,102,241,0.15)", borderTopLeftRadius: "4px" }}>
                <div className="flex items-center gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 relative z-20" style={{ borderTop: "1px solid rgba(99,102,241,0.15)", background: "rgba(5,8,17,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                className="sam-input w-full px-4 py-3 rounded-xl text-sm"
                rows={1}
                placeholder="Ask S.A.M anything..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
                }}
                onKeyDown={handleKey}
                style={{ minHeight: "48px", maxHeight: "140px", fontSize: "14px" }}
              />
            </div>
            <button
              className="send-btn w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              <Icon name="Send" size={18} style={{ color: "white" }} />
            </button>
          </div>
          <p className="text-center mt-2 text-xs" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}