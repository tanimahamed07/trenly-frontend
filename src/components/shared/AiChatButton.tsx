"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { aiService } from "@/services/ai.service"; // তোমার পাথ অনুযায়ী ইমপোর্ট করো

const AiChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your Trendly Assistant. How can I help you today? 🛍️",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // অটো স্ক্রল টু বটম
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const QUICK_ACTIONS = [
    { label: "Track Order 📦", value: "How can I track my order?" },
    { label: "Top Deals 🔥", value: "Show me the best deals for today" },
    { label: "Refund Policy 🔄", value: "What is your return policy?" },
  ];

  // মেসেজ পাঠানোর মেইন ফাংশন
  const handleSendMessage = async (textValue?: string) => {
    const messageToSend = textValue || input;
    if (!messageToSend.trim() || loading) return;

    // ইউজার মেসেজ স্টেট আপডেট
    const userMessage = { role: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // aiService কল করা
    const result = await aiService.chatWithAI(messageToSend);

    if (result.success) {
      setMessages((prev) => [...prev, { role: "ai", text: result.data }]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I'm having trouble connecting right now. 🛠️",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[99] p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <MessageSquare size={28} className="group-hover:rotate-12" />
        )}
        {!isOpen && (
          <span className="absolute -top-2 -left-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[99] w-[90vw] sm:w-[400px] h-[550px] bg-base-100 rounded-3xl shadow-2xl border border-base-300 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary p-5 text-white flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wider">
                Trendly AI
              </h3>
              <p className="text-[10px] opacity-80 font-bold uppercase">
                Online & Ready to help
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/30"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-base-100 text-neutral rounded-tl-none border border-base-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-base-100 p-3 rounded-2xl rounded-tl-none border border-base-200 flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions & Input */}
          <div className="p-4 bg-base-100 border-t border-base-200 space-y-3">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleSendMessage(action.value)}
                  className="text-[10px] font-bold px-3 py-1.5 bg-base-200 hover:bg-primary hover:text-white rounded-full transition-colors border border-base-300"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input Group */}
            <div className="flex gap-2 bg-base-200 p-1.5 rounded-2xl border border-base-300 focus-within:ring-2 ring-primary/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                className="p-2.5 bg-primary text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center opacity-50 font-medium">
              Powered by Gemini AI ✨
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChatButton;
