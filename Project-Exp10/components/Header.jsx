import React from 'react';
import { Trash2, BookText, Download } from 'lucide-react';

const Header = ({ onClearChat, onSummarize, onExportChat }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-slate-700 bg-slate-800/80 backdrop-blur-sm rounded-t-xl gap-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
        <h2 className="font-semibold text-white">AI Assistant</h2>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSummarize}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
          title="Summarize Conversation"
          aria-label="Summarize Conversation"
        >
          <BookText size={18} />
        </button>
        <button
          onClick={onExportChat}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
          title="Export Conversation"
          aria-label="Export Conversation"
        >
          <Download size={18} />
        </button>
        <button
          onClick={onClearChat}
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-md transition-colors"
          title="Clear Conversation"
          aria-label="Clear Conversation"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Header;
