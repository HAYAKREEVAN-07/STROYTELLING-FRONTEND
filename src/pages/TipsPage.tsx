import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Target, FileText, ChevronRight, Zap } from 'lucide-react';
import { Header } from '../components/Header';
import { PageLayout } from '../components/PageLayout';

const ALL_TIPS = [
  {
    title: "Start your story with a moment, not background",
    description: "Drop the listener right into the action. You can explain the 'who' and 'where' as the story unfolds naturally.",
    example: "Instead of 'So last year I was working at this firm...', try 'I was staring at the email, realizing I just sent the wrong file to the entire company.'"
  },
  {
    title: "Use emotions before facts",
    description: "People connect with how you felt about what happened, not just the logical sequence of events.",
    example: "Instead of 'The car broke down', use 'A sudden clunking sound killed the engine, and my stomach dropped as I realized I was stranded.'"
  },
  {
    title: "Keep sentences short and clear",
    description: "Long run-on sentences dilute your impact. Punchy sentences make the listener pay closer attention."
  },
  {
    title: "End with a takeaway or lesson",
    description: "The best stories leave the audience with a universal truth or a clear reason why the story was told."
  },
  {
    title: "Avoid unnecessary details",
    description: "If the color of the car or the exact time of day doesn't affect the outcome, cut it out."
  }
];

export function TipsPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredTip = ALL_TIPS[activeIndex];

  const handleNextTip = () => {
    setActiveIndex((prev) => (prev + 1) % ALL_TIPS.length);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Storytelling Tips" />
      
      <PageLayout
        mode="main-right"
        main={
          <div className="space-y-8 h-full">
            {/* Featured Tip */}
            <section className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-white opacity-5">
                <Lightbulb className="w-32 h-32" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex-1 space-y-4">
                  <span className="bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-300" /> Featured Tip
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">"{featuredTip.title}"</h2>
                  <p className="text-blue-100 text-lg">{featuredTip.description}</p>
                  {featuredTip.example && (
                    <div className="bg-white/10 p-4 rounded-xl border border-white/20 mt-2">
                      <span className="text-xs uppercase tracking-widest text-blue-200 font-bold block mb-1">Example</span>
                      <p className="font-medium italic text-blue-50">"{featuredTip.example}"</p>
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleNextTip}
                  className="shrink-0 bg-white text-indigo-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl transition-colors shadow-sm self-start md:self-auto flex items-center gap-2"
                >
                  Next Tip <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* All Tips Grid */}
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 px-1">More Quick Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {ALL_TIPS.map((tip, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-all duration-200 hover:shadow-md hover:border-blue-200">
                    <div className="bg-amber-100 p-2 rounded-lg text-amber-600 shrink-0 h-fit">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 leading-snug">{tip.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        }
        right={
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900">Daily Insights</h1>
              <p className="text-gray-500 text-lg">Small changes that make a huge difference in your stories.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/guided')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <Target className="w-5 h-5" /> Try in Practice
              </button>
              <button 
                onClick={() => navigate('/template')}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <FileText className="w-5 h-5 text-gray-500" /> Use Templates
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
