import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { BookOpen, ChevronDown, CheckCircle2, Lightbulb, Target, FileText, Activity } from 'lucide-react';
import { examplesData, CATEGORIES } from '../../data/examplesData';
import { cn } from '../../utils/cn';

export function ExamplesLibraryPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredExamples = selectedCategory === "All" 
    ? examplesData 
    : examplesData.filter(ex => ex.category === selectedCategory);

  const handleEvaluate = (storyText: string) => {
    localStorage.setItem('currentStory', storyText);
    navigate('/evaluation', { state: storyText });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Story Examples" />

      <PageLayout
        mode="left-main"
        left={
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Examples Library</h1>
              <p className="text-gray-500 text-lg">Learn from real story transformations.</p>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-2">
              <h3 className="font-bold text-gray-900 mb-2 px-2 uppercase tracking-wide text-sm">Categories</h3>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-5 py-3.5 rounded-xl font-bold text-sm text-left transition-all",
                    selectedCategory === cat 
                      ? "bg-gray-900 text-white shadow-sm" 
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        }
        main={
          <div className="h-full min-h-[500px]">
            {/* List of Examples */}
            {filteredExamples.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 h-full">
                <div className="bg-indigo-50 p-4 rounded-full">
                  <BookOpen className="w-8 h-8 text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">No examples available</h2>
                <p className="text-gray-500">Explore examples to improve your storytelling.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredExamples.map(example => {
                  const isExpanded = expandedId === example.id;

                  return (
                    <div key={example.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:border-gray-200">
                      {/* Card Header (Clickable) */}
                      <div 
                        onClick={() => setExpandedId(isExpanded ? null : example.id)}
                        className="p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors flex items-start sm:items-center justify-between gap-6"
                      >
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
                            <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-sm border border-indigo-200 w-fit">
                              {example.category}
                            </span>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{example.title}</h2>
                          </div>
                          {!isExpanded && (
                            <p className="text-gray-500 line-clamp-2 pr-4 text-base leading-relaxed">{example.rawStory}</p>
                          )}
                        </div>
                        <button className={cn(
                          "shrink-0 p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-all",
                          isExpanded && "rotate-180 bg-indigo-100 text-indigo-600 shadow-sm"
                        )}>
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Expanded Detail View */}
                      {isExpanded && (
                        <div className="px-6 py-8 md:px-8 border-t border-gray-100 bg-gray-50/50 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                          
                          <div className="grid lg:grid-cols-2 gap-6">
                            {/* Raw Story */}
                            <div className="space-y-3 h-full flex flex-col">
                              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-300" />
                                Before
                              </h3>
                              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1 flex items-start opacity-70">
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed italic">"{example.rawStory}"</p>
                              </div>
                            </div>

                            {/* Improved Story */}
                            <div className="space-y-3 h-full flex flex-col">
                              <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                After
                              </h3>
                              <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.1)] ring-1 ring-indigo-50 flex-1 relative overflow-hidden flex items-start">
                                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                                <p className="text-gray-900 font-bold text-base md:text-lg leading-relaxed">"{example.improvedStory}"</p>
                              </div>
                            </div>
                          </div>

                          {/* Analysis Section */}
                          <div className="grid lg:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                            {/* Why it's better */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                Why This is Better
                              </h3>
                              <ul className="space-y-3">
                                {example.explanation.map((item, i) => (
                                  <li key={i} className="flex items-start gap-4 text-gray-700 bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                    <span className="text-green-500 font-extrabold mt-0.5 text-lg">•</span>
                                    <span className="leading-snug text-base">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Takeaways */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-amber-500" />
                                Key Takeaways
                              </h3>
                              <ul className="space-y-3">
                                {example.tips.map((tip, i) => (
                                  <li key={i} className="flex items-start gap-4 text-gray-700 bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                                    <span className="text-amber-500 font-extrabold mt-0.5 text-lg">💡</span>
                                    <span className="font-medium text-base leading-snug">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
                            <button 
                              onClick={() => navigate('/guided', { state: { sourceStory: example.improvedStory } })}
                              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-base"
                            >
                              <Target className="w-5 h-5 text-blue-500" /> Try Similar Story
                            </button>
                            <button 
                              onClick={() => navigate('/template')}
                              className="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-base"
                            >
                              <FileText className="w-5 h-5 text-amber-500" /> Use Template
                            </button>
                            <button 
                              onClick={() => handleEvaluate(example.improvedStory)}
                              className="flex-[1.5] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 flex items-center justify-center gap-2 text-base"
                            >
                              <Activity className="w-5 h-5" /> Evaluate This
                            </button>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
