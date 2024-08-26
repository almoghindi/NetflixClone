
import React, { useState } from "react";

const FAQItem: React.FC<{ question: string; answer: string }> = ({
    question,
    answer,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border-b border-gray-800 mb-4" style={{ backgroundColor: 'rgb(45, 45, 45)' }}>
        <button
          className="w-full py-4 px-6 text-left flex justify-between items-center text-xl font-medium text-white "
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: '#fff' }} 
        >
          <span className="font-bold">{question}</span>
          <span className="text-3xl">{isOpen ? '✕' : '+'}</span>
        </button>
        {isOpen && (
          <div className="px-6 pb-4 text-lg text-left font-medium text-white">
            {answer}
          </div>
        )}
      </div>
    );
};

export default FAQItem
