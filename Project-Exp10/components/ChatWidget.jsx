import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import { MessageSquare, X } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-11/12 max-w-lg h-3/4' : 'w-16 h-16'
        }`}
      >
        <div className="w-full h-full relative">
          {isOpen && (
            <div className="absolute top-0 left-0 w-full h-full opacity-100 transition-opacity duration-300">
              <ChatWindow />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-indigo-600 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-indigo-500 transition-all duration-300 transform hover:scale-110"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
      </button>
    </div>
  );
};

export default ChatWidget;
