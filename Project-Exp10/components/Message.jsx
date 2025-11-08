import React from 'react';
import { Bot, User } from 'lucide-react';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-xl ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-slate-700 text-slate-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <span
          className={`text-xs mt-1.5 block ${
            isUser ? 'text-indigo-200 text-right' : 'text-slate-500 text-left'
          }`}
        >
          {message.timestamp}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Message;
