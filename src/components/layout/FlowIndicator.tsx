import { BookOpen, Target, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export type FlowStep = 'Learn' | 'Practice' | 'Evaluate' | 'Improve';

interface FlowIndicatorProps {
  currentStep: FlowStep;
}

const STEPS: { id: FlowStep; label: string; icon: any }[] = [
  { id: 'Learn', label: 'Learn', icon: BookOpen },
  { id: 'Practice', label: 'Practice', icon: Target },
  { id: 'Evaluate', label: 'Evaluate', icon: CheckCircle2 },
  { id: 'Improve', label: 'Improve', icon: Sparkles },
];

export function FlowIndicator({ currentStep }: FlowIndicatorProps) {
  return (
    <div className="mb-6 flex items-center justify-center relative max-w-2xl mx-auto w-full px-2 sm:px-0">
      {/* Background Line */}
      <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 -z-10 hidden sm:block"></div>
      
      <div className="flex items-center justify-between w-full relative z-10 bg-[#F9FAFB]">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isPast = STEPS.findIndex(s => s.id === currentStep) > index;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 flex-1 sm:flex-none px-2 bg-[#F9FAFB]">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border-2",
                  isActive 
                    ? "bg-blue-600 border-blue-600 text-white scale-110" 
                    : isPast
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "bg-white border-gray-200 text-gray-400"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "animate-pulse" : "")} />
              </div>
              <span className={cn(
                "text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-300",
                isActive ? "text-blue-600" : isPast ? "text-gray-700" : "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
