import React, { useState } from 'react';
import { faqs } from '../data/support';
import { ChevronDown } from 'lucide-react';

const SupportPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="support" className="py-16 bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-700 last:border-b-0">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left py-4"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-slate-300 pb-4 pr-6">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
