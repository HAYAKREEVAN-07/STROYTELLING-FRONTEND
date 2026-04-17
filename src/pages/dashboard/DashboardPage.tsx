import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { Play, TrendingUp, BookOpen, Mic, PenTool, Lightbulb, History, Target, Sparkles, BookText, MessageCircle, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-12">
      <Header title="Dashboard" />
      
      <PageLayout 
        mode="main-right"
        main={
          <>
            {/* Section 1: User Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, User</h1>
              <p className="text-gray-500 font-medium mt-1">Level: Intermediate Storyteller</p>
            </section>

            {/* Section 2: Progress Snapshot */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1 w-full">
                <span className="text-gray-500 text-sm font-medium">Last Score</span>
                <span className="text-3xl font-bold text-gray-900">78<span className="text-lg text-gray-400 font-semibold">/100</span></span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1 w-full">
                <span className="text-gray-500 text-sm font-medium">Weekly Improvement</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-green-600">+12%</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-1 w-full">
                <span className="text-gray-500 text-sm font-medium">Weakest Skill</span>
                <span className="text-xl font-bold text-red-500 mt-1">Emotional Depth</span>
              </div>
            </section>

            {/* Section 3: Primary Actions */}
            <section className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/guided')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Target className="w-5 h-5" /> Start Practice Journey
              </button>
              <button 
                onClick={() => alert('Continuing training placeholder')}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 text-blue-600" /> Continue Training
              </button>
              <button 
                onClick={() => navigate('/evaluation')}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <History className="w-5 h-5 text-gray-500" /> View Last Evaluation
              </button>
            </section>

            {/* Section 4: Smart Module Access */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Smart Modules</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                
                <ModuleGroup title="📚 Learning">
                  <ModuleItem title="Learning Path" icon={<BookOpen size={18} />} onClick={() => navigate('/learning')} />
                  <ModuleItem title="What/Why/How" icon={<BookText size={18} />} onClick={() => navigate('/learn-basics')} />
                </ModuleGroup>

                <ModuleGroup title="🛠 Practice">
                  <ModuleItem title="Direct Story Input" icon={<PenTool size={18} />} onClick={() => navigate('/submit')} />
                  <ModuleItem title="Guided Story Builder" icon={<Target size={18} />} onClick={() => navigate('/guided')} />
                  <ModuleItem title="Story Templates" icon={<PenTool size={18} />} onClick={() => navigate('/template')} />
                  <ModuleItem title="Roleplay" icon={<MessageCircle size={18} />} onClick={() => navigate('/roleplay')} />
                </ModuleGroup>

                <ModuleGroup title="✨ Improve">
                  <ModuleItem title="Word Enhancement" icon={<Sparkles size={18} />} onClick={() => navigate('/enhance')} />
                  <ModuleItem title="Tips" icon={<Lightbulb size={18} />} onClick={() => navigate('/tips')} />
                </ModuleGroup>

                <ModuleGroup title="📖 Explore">
                  <ModuleItem title="Examples Library" icon={<BookOpen size={18} />} onClick={() => navigate('/examples')} />
                </ModuleGroup>

                <ModuleGroup title="🎤 Speaking">
                  <ModuleItem title="Delivery Coaching" icon={<Mic size={18} />} onClick={() => navigate('/delivery-coaching')} />
                </ModuleGroup>

                <ModuleGroup title="📈 Track">
                  <ModuleItem title="Progress Analytics" icon={<TrendingUp size={18} />} onClick={() => navigate('/analytics')} />
                  <ModuleItem title="Revision History" icon={<History size={18} />} onClick={() => navigate('/history')} />
                </ModuleGroup>

              </div>
            </section>
          </>
        }
        right={
          <>
            {/* Dashboard State Awareness / Resume */}
            {localStorage.getItem('currentStory') && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                   <span className="text-xs uppercase font-bold text-blue-500 tracking-wider">Current Story</span>
                   <ChevronRight className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 italic">"{localStorage.getItem('currentStory')}"</p>
                <div className="flex flex-col gap-2 mt-2">
                  <button 
                    onClick={() => navigate('/submit', { state: { draft: localStorage.getItem('currentStory') }})}
                    className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors text-center"
                  >
                    Continue Draft
                  </button>
                  <button 
                    onClick={() => navigate('/evaluation', { state: localStorage.getItem('currentStory') })}
                    className="w-full bg-indigo-600 border border-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors text-center"
                  >
                    Re-evaluate
                  </button>
                </div>
              </div>
            )}

            {/* Section 2.5: Recommended Next Step (Stacked for Side Panel) */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 shadow-md text-white flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="bg-white/20 p-3 rounded-xl self-start">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-100 uppercase tracking-widest block mb-1">Recommended Next Step</span>
                  <h3 className="text-xl font-bold">You need to improve emotional depth</h3>
                </div>
              </div>
              <button 
                onClick={() => navigate('/guided')}
                className="w-full bg-white text-blue-700 hover:bg-gray-50 font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Start Guided Practice <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Section 6: Daily Tip */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
              <div className="absolute -right-6 -top-6 text-gray-800 opacity-30">
                <Lightbulb className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2 block">Daily Tip</span>
                <p className="text-lg font-medium leading-snug">"Start your story with a moment, not background."</p>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

function ModuleGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
      <h3 className="font-bold text-gray-800 text-sm tracking-wide">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

function ModuleItem({ title, icon, active = false, onClick }: { title: string, icon: React.ReactNode, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick || (() => alert(`Navigating to ${title}`))}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left font-medium text-sm group",
        active 
          ? "bg-blue-50 text-blue-700 border border-blue-100" 
          : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent"
      )}
    >
      <span className={cn(
        "p-1.5 rounded-lg transition-colors",
        active ? "bg-blue-100 text-blue-600" : "bg-white text-gray-500 group-hover:text-gray-700 shadow-sm"
      )}>
        {icon}
      </span>
      {title}
    </button>
  );
}
