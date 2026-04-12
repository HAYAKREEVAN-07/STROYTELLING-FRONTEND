import React from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { Feedback as FeedbackType } from '../types/evaluation';
import { cn } from '../utils/cn';

interface FeedbackProps {
  feedback: FeedbackType;
}

export function Feedback({ feedback }: FeedbackProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Detailed Feedback</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FeedbackBlock 
          title="Strengths" 
          items={feedback.strengths} 
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
          bgClass="bg-green-50/50"
          borderClass="border-green-100"
          titleClass="text-green-800"
        />
        <FeedbackBlock 
          title="Weaknesses" 
          items={feedback.weaknesses} 
          icon={<XCircle className="w-5 h-5 text-red-500" />}
          bgClass="bg-red-50/50"
          borderClass="border-red-100"
          titleClass="text-red-800"
        />
        <FeedbackBlock 
          title="Actionable Suggestions" 
          items={feedback.suggestions} 
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
          bgClass="bg-amber-50/50"
          borderClass="border-amber-100"
          titleClass="text-amber-800"
        />
      </div>
    </div>
  );
}

interface FeedbackBlockProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  bgClass: string;
  borderClass: string;
  titleClass: string;
}

function FeedbackBlock({ title, items, icon, bgClass, borderClass, titleClass }: FeedbackBlockProps) {
  return (
    <div className={cn("rounded-2xl p-5 border shadow-sm", bgClass, borderClass)}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className={cn("font-semibold", titleClass)}>{title}</h3>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-40" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">None noted.</p>
      )}
    </div>
  );
}
