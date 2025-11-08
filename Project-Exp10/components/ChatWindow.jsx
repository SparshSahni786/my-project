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
      const trimmed = (text || '').trim();
      if (!trimmed) return;
      if (isLoading) return;

      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      // Show the user's message immediately
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        console.log('CLIENT sending text:', trimmed);
        // Pass conversation history for context
        const aiResponse = await sendMessageToAI(trimmed, products, messages);
        console.log('CLIENT got reply:', aiResponse);

        // Handle both string or structured object returns
        const displayText =
          typeof aiResponse === 'string'
            ? aiResponse
            : aiResponse?.text || 'No response received.';

        if (aiResponse?.structured) {
          console.log('Structured AI data:', aiResponse.structured);
        }


        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'model',
          text: displayText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('handleSendMessage error:', error);
        const errorMessage = {
          id: `error-${Date.now()}`,
          role: 'model',
          text: "Sorry, something went wrong. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);

        // Optional: rate limiting UI message
        if (error instanceof Error && error.message.includes('429')) {
          setRateLimitMessage("You've sent too many messages. Please wait a moment before trying again.");
          setTimeout(() => setRateLimitMessage(null), 60000);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, products] // include products to ensure updates propagate
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
      const errorMessage = {
        id: `summary-error-${Date.now()}`,
        role: 'model',
        text: "Sorry, I couldn't create a summary right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
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
