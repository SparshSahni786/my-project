import React, { useState, useRef } from 'react';
import { ArrowUp, ShieldAlert } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading, rateLimitMessage }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const isInputDisabled = isLoading || !!rateLimitMessage;

  const handleSubmit = () => {
    if (text.trim() && !isInputDisabled) {
      onSendMessage(text);
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after send
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (event) => {
    setText(event.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="p-4 border-t border-slate-700 bg-slate-800 rounded-b-xl">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={rateLimitMessage || "Ask about products or orders..."}
          className={`w-full bg-slate-700 text-slate-200 placeholder-slate-400 rounded-lg py-3 pl-4 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 max-h-40 ${
            isInputDisabled ? 'cursor-not-allowed opacity-70' : ''
          }`}
          rows={1}
          disabled={isInputDisabled}
          aria-label="Chat input"
        />
        <button
          onClick={handleSubmit}
          disabled={isInputDisabled || !text.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200 bg-indigo-600 text-white enabled:hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <ArrowUp size={20} />
        </button>
      </div>
      {rateLimitMessage && (
        <div className="flex items-center text-yellow-400 text-xs mt-2 pl-1">
          <ShieldAlert size={14} className="mr-1.5" />
          {rateLimitMessage}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
