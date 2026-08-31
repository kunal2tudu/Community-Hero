import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { api } from '../services/api.js';

export const HeroBotModal = () => {
  const { isHeroBotOpen, setIsHeroBotOpen, playAudioFeedback } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I'm HeroBot, your Hyperlocal AI Civic Assistant. How can I help you improve our neighborhood today?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "How does AI Vision detect potholes?",
    "How do I earn the 'Pothole Patrol' badge?",
    "What happens when 5 neighbors verify an issue?",
    "What is the average resolution time?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isHeroBotOpen) scrollToBottom();
  }, [messages, isHeroBotOpen]);

  if (!isHeroBotOpen) return null;

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    playAudioFeedback('click');
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.sendChatMessage(query);
      setIsTyping(false);
      if (res && res.success) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: res.reply,
            time: 'Just now'
          }
        ]);
        playAudioFeedback('vote');
      }
    } catch {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "I'm having trouble reaching the civic server right now, but feel free to explore our live map or submit an issue report!",
          time: 'Just now'
        }
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-container border-2 border-primary rounded-[2rem] w-full max-w-lg shadow-[0_8px_0_0_rgba(0,0,0,1)] flex flex-col h-[580px] overflow-hidden relative">
        {/* Header */}
        <div className="bg-accent-blue border-b-2 border-primary px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary bg-container flex items-center justify-center text-xl shadow-[0_2px_0_0_rgba(0,0,0,1)]">
              🤖
            </div>
            <div>
              <h3 className="font-headline-md font-bold text-base text-primary">HeroBot AI Assistant</h3>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                Hyperlocal Civic Intelligence
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsHeroBotOpen(false)}
            className="w-8 h-8 rounded-full border border-primary bg-container flex items-center justify-center text-primary hover:bg-surface-container-low"
          >
            ✕
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-surface-container-low/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl border text-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary text-on-primary border-primary rounded-tr-none shadow-[0_2px_0_0_rgba(0,0,0,1)]'
                    : 'bg-container text-primary border-primary rounded-tl-none shadow-[0_2px_0_0_rgba(0,0,0,1)]'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-surface-dim text-right' : 'text-outline'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-container border border-primary rounded-2xl p-3 flex items-center gap-1.5 shadow-[0_2px_0_0_rgba(0,0,0,1)]">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-container border-t border-outline-variant flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="whitespace-nowrap px-3 py-1 bg-surface-container-low hover:bg-accent-blue border border-primary rounded-full text-xs font-semibold transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-container border-t-2 border-primary flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about local issues or AI triage..."
            className="flex-1 px-4 py-2.5 bg-surface-container-lowest border border-primary rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="btn-ink px-5 py-2.5 font-bold text-xs flex items-center gap-1"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
};
