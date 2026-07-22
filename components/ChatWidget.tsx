"use client";

import { useState, useRef } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const FOLLOW_UPS = ["Show 2-bedroom flats under 30k", "Best areas for families", "Compare rent vs buy"];
const API_BASE = "";

function newSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChatWidget() {
  const [sessionId, setSessionId] = useState(() => newSessionId());
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const streamingText = useRef("");

  function startNewChat() {
    setSessionId(newSessionId());
    setMessages([]);
    setInput("");
    setIsTyping(false);
  }

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);
    streamingText.current = "";

    const res = await fetch(`${API_BASE}/api/chat/message`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message: text }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split("\n\n")) {
        if (!line.startsWith("data: ")) continue;
        const payload = JSON.parse(line.replace("data: ", ""));
        if (payload.token) {
          streamingText.current += payload.token;
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", content: streamingText.current };
            return copy;
          });
        }
      }
    }
    setIsTyping(false);
  }

  return (
    <div className="flex h-[500px] w-full max-w-md flex-col rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-white">
        <span>GhorKhoj AI Assistant</span>
        <button
          onClick={startNewChat}
          className="rounded-full border border-white/40 px-3 py-1 text-xs hover:bg-white/10"
          title="Start a fresh conversation"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <p className="text-sm text-slate-400">Ask me about properties, budget, or areas — I can search live listings for you.</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
              m.role === "user" ? "ml-auto bg-accent text-primary" : "bg-slate-100 text-primary"
            }`}
          >
            {m.content}
          </div>
        ))}
        {isTyping && <div className="text-xs text-slate-400">GhorKhoj AI is typing…</div>}
      </div>

      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {FOLLOW_UPS.map((f) => (
          <button
            key={f}
            onClick={() => sendMessage(f)}
            className="rounded-full border border-accent px-3 py-1 text-xs text-accent hover:bg-accent hover:text-white"
          >
            {f}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex gap-2 border-t border-slate-200 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm text-white">
          Send
        </button>
      </form>
    </div>
  );
}
