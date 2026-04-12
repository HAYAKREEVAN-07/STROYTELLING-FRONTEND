import { PenTool, RotateCcw, Target, LogOut } from 'lucide-react';

interface ActionButtonsProps {
  onRewrite?: () => void;
  onTryAgain?: () => void;
  onPracticeWait?: () => void;
  onGoToTraining?: () => void;
}

export function ActionButtons({
  onRewrite,
  onTryAgain,
  onPracticeWait,
  onGoToTraining
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 pb-12">
      {/* Primary CTA */}
      <button 
        onClick={onRewrite}
        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <PenTool className="w-5 h-5" />
        Rewrite Story
      </button>

      {/* Secondary Actions */}
      <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button 
          onClick={onPracticeWait}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-4 rounded-xl border border-gray-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <Target className="w-4 h-4 text-indigo-500" />
          Practice Weak Areas
        </button>
        
        <button 
          onClick={onTryAgain}
          className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3.5 px-4 rounded-xl border border-gray-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <RotateCcw className="w-4 h-4 text-gray-400" />
          Try Again
        </button>

        <button 
          onClick={onGoToTraining}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <LogOut className="w-4 h-4" />
          Exit
        </button>
      </div>
    </div>
  );
}
