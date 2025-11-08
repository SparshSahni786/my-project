import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 px-6 pb-2">
      <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></div>
    </div>
  );
};

export default TypingIndicator;
