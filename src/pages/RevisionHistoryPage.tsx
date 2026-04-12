import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/PageLayout';
import { Header } from '../components/Header';
import { BookOpen, Clock, Activity, SplitSquareHorizontal } from 'lucide-react';
import { cn } from '../utils/cn';

const MOCK_HISTORY = [
  {
    id: 3,
    text: "I was presenting my project to the class and suddenly the projector died. I had to explain everything using just my hands and a whiteboard marker. It was a disaster but I got an A.",
    score: 85,
    date: "Mar 18",
    improved_version: "My heart raced as the projector screen went pitch black mid-presentation. Armed with nothing but a whiteboard marker and pure adrenaline, I frantically mapped out my entire project by hand. Miraculously, that chaotic breakdown earned me an A."
  },
  {
    id: 2,
    text: "I lost my wallet at college. I looked everywhere for it. Then someone called me saying they found it at the library.",
    score: 72,
    date: "Mar 10",
    improved_version: "I frantically searched every pocket as the reality set in: my wallet was gone, along with my tuition money. Two hours of panic later, my phone rang—a stranger had found it sitting quietly on a library desk."
  },
  {
    id: 1,
    text: "When I was young I wanted to be a pilot because planes are cool.",
    score: 60,
    date: "Feb 28",
    improved_version: "As a kid, staring up at passenger jets carving white lines in the sky filled me with absolute awe. I didn't just want to fly; I wanted to live in the clouds."
  }
];

export function RevisionHistoryPage() {
  const navigate = useNavigate();
  const [comparingId, setComparingId] = useState<number | null>(null);

  const handleEvaluate = (storyText: string) => {
    localStorage.setItem('currentStory', storyText);
    navigate('/evaluation', { state: storyText });
  };

  if (MOCK_HISTORY.length === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
        <Header title="Your Story History" />
        <PageLayout
          mode="left-main"
          left={
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Revision History</h1>
              <p className="text-gray-500">View past stories and compare your progress.</p>
            </div>
          }
          main={
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 h-full min-h-[400px]">
              <div className="bg-indigo-50 p-4 rounded-full">
                <Clock className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Start your first story</h2>
              <p className="text-gray-500">Explore practice modules to start tracking your journey.</p>
              <button 
                onClick={() => navigate('/guided')}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm"
              >
                Start First Practice
              </button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Your Story History" />
      
      <PageLayout
        mode="left-main"
        left={
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Revision History</h1>
            <p className="text-gray-500">View past stories and compare your progress.</p>
          </div>
        }
        main={
          <div className="space-y-6">
            {MOCK_HISTORY.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md hover:border-gray-200">
                <div className="p-6 md:p-8 space-y-6">
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-wider">
                      <Clock className="w-5 h-5 text-indigo-400" /> {story.date}
                    </div>
                    <div className={cn(
                      "font-bold px-4 py-1.5 rounded-full text-sm",
                      story.score >= 80 ? "bg-green-100 text-green-700" :
                      story.score >= 70 ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      Score: {story.score}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Original Story</h3>
                    <p className="text-gray-800 text-lg leading-relaxed italic border-l-4 border-gray-200 pl-5 py-2">"{story.text}"</p>
                  </div>

                  {/* Compare Section Toggle */}
                  {comparingId === story.id && (
                    <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300 mx-2">
                      <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <SplitSquareHorizontal className="w-5 h-5" /> Improved Version
                      </h3>
                      <p className="text-indigo-900 text-lg leading-relaxed font-medium">"{story.improved_version}"</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-50">
                    <button 
                      onClick={() => handleEvaluate(story.text)}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-base w-full"
                    >
                      <Activity className="w-4 h-4" /> View Evaluation Details
                    </button>
                    <button 
                      onClick={() => setComparingId(comparingId === story.id ? null : story.id)}
                      className={cn(
                        "flex-1 font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 border text-base w-full",
                        comparingId === story.id 
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                          : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                      )}
                    >
                      <BookOpen className="w-4 h-4" /> 
                      {comparingId === story.id ? "Hide Improved Version" : "Compare Versions"}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}
