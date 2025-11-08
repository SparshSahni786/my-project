import React, { useState, useCallback } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import { sendMessageToAI, summarizeConversation, clearChatSession } from '../services/chatService';
import { products } from '../data/products';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 'initial-message',
      role: 'model',
      text: "Hello! I'm your AI assistant. How can I help you today with products or orders?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState(null);

  const handleSendMessage = useCallback(
    async (text) => {
      if (isLoading) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const aiResponse = await sendMessageToAI(text, products);

        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: aiResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error(error);
        const errorMessage = {
          id: `error-${Date.now()}`,
          role: 'model',
          text: "Sorry, something went wrong. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);

        if (error instanceof Error && error.message.includes('429')) {
          setRateLimitMessage("You've sent too many messages. Please wait a moment before trying again.");
          setTimeout(() => setRateLimitMessage(null), 60000);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const handleClearChat = useCallback(() => {
    clearChatSession();
    setMessages([
      {
        id: 'initial-message-cleared',
        role: 'model',
        text: "Chat cleared! How can I help you start a new conversation?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const handleSummarize = useCallback(async () => {
    if (isLoading || messages.length <= 1) return;
    setIsLoading(true);
    try {
      const summary = await summarizeConversation(messages);
      const summaryMessage = {
        id: `summary-${Date.now()}`,
        role: 'model',
        text: `Here is a summary of our conversation:\n\n${summary}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, summaryMessage]);
    } catch (error) {
      console.error('Failed to summarize:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleExportChat = useCallback(() => {
    const chatContent = messages
      .map((msg) => `[${msg.timestamp}] ${msg.role.toUpperCase()}: ${msg.text}`)
      .join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-export-${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-indigo-900/30">
      <Header onClearChat={handleClearChat} onSummarize={handleSummarize} onExportChat={handleExportChat} />
      <MessageList messages={messages} />
      {isLoading && <TypingIndicator />}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} rateLimitMessage={rateLimitMessage} />
    </div>
  );
};

export default ChatWindow;
