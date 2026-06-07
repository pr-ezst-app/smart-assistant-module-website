import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import ChatPage from "@/components/ChatPage";

type Page = "home" | "chat";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (page === "chat") return <ChatPage onBack={() => setPage("home")} />;

  return (
    <div className="min-h-screen grid-bg overflow-x-hidden" style={{ background: "var(--sam-bg)" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb w-[600px] h-[600px] top-[-200px] left-[-200px] opacity-30"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", animation: "orb-drift 12s ease-in-out infinite" }} />
        <div className="orb w-[500px] h-[500px] bottom-[-150px] right-[-150px] opacity-20"
          style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)", animation: "orb-drift 15s ease-in-out infinite reverse" }} />
        <div className="orb w-[300px] h-[300px] top-[40%] right-[20%] opacity-15"
          style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 70%)", animation: "orb-drift 10s ease-in-out infinite 3s" }} />
      </div>

      {/* Nav */}
      <nav className="sam-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
              <span className="text-xs font-bold text-white" style={{ fontFamily: "'Space Mono', monospace" }}>S</span>
            </div>
            <span className="font-bold text-sm tracking-widest" style={{ color: "var(--sam-text)", fontFamily: "'Space Mono', monospace" }}>
              S.A.M
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>
              v1.0
            </span>
            <button
              onClick={() => setPage("chat")}
              className="send-btn px-5 py-2 rounded-lg text-white text-sm font-semibold"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Launch Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-40 pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8"
            style={{
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "var(--sam-violet)",
              fontFamily: "'Space Mono', monospace",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s ease 0.1s"
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Smart Assistant Module — Online
          </div>

          <h1
            className="text-6xl md:text-8xl font-extrabold leading-none mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(32px)",
              transition: "all 0.7s ease 0.2s"
            }}
          >
            <span className="block text-white">Meet</span>
            <span className="block shimmer-text">S.A.M</span>
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto mb-4 leading-relaxed"
            style={{
              color: "var(--sam-muted)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "14px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.35s"
            }}
          >
            Smart Assistant Module — your intelligent companion powered by advanced AI. Ask anything, get precise answers with adjustable tone, depth, and expertise.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s ease 0.5s"
            }}
          >
            <button
              onClick={() => setPage("chat")}
              className="send-btn px-8 py-4 rounded-xl text-white text-base font-bold animate-pulse-glow"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "0.05em" }}
            >
              Start Chatting →
            </button>
            <button
              className="px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid rgba(99, 102, 241, 0.3)",
                color: "var(--sam-text)",
                fontFamily: "'Space Mono', monospace"
              }}
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn more ↓
            </button>
          </div>
        </div>

        {/* Floating chat preview */}
        <div
          className="max-w-2xl mx-auto mt-20"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(48px)",
            transition: "all 0.7s ease 0.65s"
          }}
        >
          <div className="glass rounded-2xl p-6 animate-float" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(99, 102, 241, 0.1)" }}>
            <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(99, 102, 241, 0.15)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--sam-cyan)", boxShadow: "0 0 8px var(--sam-cyan)" }} />
              <span className="text-xs" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>S.A.M — Active Session</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="msg-user px-4 py-3 rounded-2xl rounded-tr-sm max-w-xs">
                  <p className="text-sm" style={{ color: "var(--sam-text)", fontFamily: "'Space Mono', monospace" }}>
                    Explain quantum computing simply
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6366f1, #22d3ee)" }}>
                  <span className="text-xs font-bold text-white">S</span>
                </div>
                <div className="msg-sam px-4 py-3 rounded-2xl rounded-tl-sm max-w-sm">
                  <p className="leading-relaxed" style={{ color: "var(--sam-text)", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>
                    Think of a regular computer as a light switch — it's either ON or OFF. A quantum computer uses "qubits" that can be ON, OFF, or both at once...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-12 px-6" style={{ borderTop: "1px solid rgba(99, 102, 241, 0.1)", borderBottom: "1px solid rgba(99, 102, 241, 0.1)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { value: "GPT-4o", label: "Powered By" },
            { value: "3 Modes", label: "Adjustable Tone" },
            { value: "∞", label: "Knowledge Depth" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-extrabold grad-text mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Built for <span className="grad-text">Intelligence</span>
            </h2>
            <p className="text-sm" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>
              Everything you need from an AI assistant, refined and precise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "Sliders",
                color: "var(--sam-violet)",
                title: "Adaptive Tone",
                desc: "Switch between Professional, Casual, and Expert modes. S.A.M adjusts its communication style to match your needs.",
              },
              {
                icon: "Layers",
                color: "var(--sam-cyan)",
                title: "Response Depth",
                desc: "Control answer length — concise summaries or deep-dive explanations. You decide how much detail you need.",
              },
              {
                icon: "Cpu",
                color: "var(--sam-pink)",
                title: "Expertise Level",
                desc: "Set your knowledge level from Beginner to Expert. S.A.M calibrates complexity and vocabulary accordingly.",
              },
              {
                icon: "Zap",
                color: "var(--sam-green)",
                title: "Instant Answers",
                desc: "Real-time responses powered by GPT-4o. No waiting — information flows as it's generated.",
              },
              {
                icon: "History",
                color: "var(--sam-violet)",
                title: "Full Context",
                desc: "S.A.M remembers your conversation, building on previous messages for coherent, contextual dialogue.",
              },
              {
                icon: "Shield",
                color: "var(--sam-cyan)",
                title: "Always On",
                desc: "24/7 availability with no downtime. S.A.M is always ready whenever inspiration or a question strikes.",
              },
            ].map((f) => (
              <div key={f.title} className="feature-card rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}40` }}>
                  <Icon name={f.icon} size={20} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass rounded-3xl p-12"
            style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
            <div className="text-5xl mb-4 animate-float">⚡</div>
            <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Ready to think smarter?
            </h2>
            <p className="text-sm mb-8" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>
              Start a conversation with S.A.M and experience AI assistance at its finest.
            </p>
            <button
              onClick={() => setPage("chat")}
              className="send-btn px-10 py-4 rounded-xl text-white text-base font-bold"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Open S.A.M Chat →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(99, 102, 241, 0.1)" }}>
        <p className="text-xs" style={{ color: "var(--sam-muted)", fontFamily: "'Space Mono', monospace" }}>
          smartassistantmodule.com © 2026 · Built with intelligence by William Lau
        </p>
      </footer>
    </div>
  );
}