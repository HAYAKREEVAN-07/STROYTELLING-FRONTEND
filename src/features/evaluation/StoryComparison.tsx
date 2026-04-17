import { useState } from 'react';
import { Story } from '../../types/evaluation';
import { Sparkles, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StoryComparisonProps {
  story: Story;
}

export function StoryComparison({ story }: StoryComparisonProps) {
  const [activeTab, setActiveTab] = useState<'original' | 'improved'>('improved');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Story Comparison</h2>
      
      {/* Mobile / Tablet Toggle View */}
      <div className="lg:hidden flex flex-col space-y-3">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('original')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all",
              activeTab === 'original' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <FileText className="w-4 h-4" />
            Original
          </button>
          <button
            onClick={() => setActiveTab('improved')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all",
              activeTab === 'improved' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Improved
          </button>
        </div>
        
        <div className="bg-white border text-gray-700 border-gray-200 rounded-xl p-5 text-sm sm:text-base leading-relaxed overflow-y-auto max-h-96 shadow-sm">
          {activeTab === 'original' ? story.original : story.improved}
        </div>
      </div>

      {/* Desktop Side-by-Side View */}
      <div className="hidden lg:grid grid-cols-2 gap-6">
        <div className="flex flex-col h-full space-y-3">
          <div className="flex items-center gap-2 text-gray-600 font-medium pb-2 border-b border-gray-100">
            <FileText className="w-5 h-5" />
            <h3>Original Story</h3>
          </div>
          <div className="bg-white text-gray-600 border border-gray-100 rounded-xl p-6 text-base leading-relaxed overflow-y-auto max-h-[500px] shadow-sm flex-1">
            {story.original}
          </div>
        </div>
        
        <div className="flex flex-col h-full space-y-3">
          <div className="flex items-center gap-2 text-gray-900 font-medium pb-2 border-b border-gray-100">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3>Improved Version</h3>
          </div>
          <div className="bg-amber-50/30 text-gray-900 border border-amber-100 rounded-xl p-6 text-base leading-relaxed overflow-y-auto max-h-[500px] shadow-sm flex-1 relative">
            {/* Subtle highlight decoration */}
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l-xl opacity-50" />
            {story.improved}
          </div>
        </div>
      </div>
      
    </div>
  );
}
