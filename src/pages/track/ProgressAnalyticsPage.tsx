import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../../components/layout/PageLayout';
import { Header } from '../../components/layout/Header';
import { TrendingUp, Target, BarChart2, Star, History } from 'lucide-react';

const MOCK_SCORES = [60, 68, 72, 78, 85];
const SKILLS = [
  { name: 'Emotional Depth', score: 65, change: '+15%' },
  { name: 'Clarity', score: 80, change: '+20%' },
  { name: 'Vocabulary', score: 70, change: '+10%' }
];

export function ProgressAnalyticsPage() {
  const navigate = useNavigate();

  const totalStories = MOCK_SCORES.length;
  // Handle Empty State
  if (totalStories === 0) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
        <Header title="Your Progress" />
        <PageLayout
          mode="left-main"
          left={
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Progress Analytics</h1>
              <p className="text-gray-500">Track how your storytelling is improving over time.</p>
            </div>
          }
          main={
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 h-full min-h-[400px]">
              <div className="bg-gray-100 p-4 rounded-full">
                <BarChart2 className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Your journey begins here</h2>
              <p className="text-gray-500">Complete some practice modules to see your progress analytics.</p>
              <button 
                onClick={() => navigate('/guided')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Start First Practice
              </button>
            </div>
          }
        />
      </div>
    );
  }

  const avgScore = Math.round(MOCK_SCORES.reduce((a, b) => a + b, 0) / totalStories);
  const bestScore = Math.max(...MOCK_SCORES);

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col pb-12">
      <Header title="Your Progress" />
      
      <PageLayout
        mode="left-main"
        left={
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-2">
              <h1 className="text-3xl font-extrabold text-gray-900">Progress Analytics</h1>
              <p className="text-gray-500">Track how your storytelling is improving over time.</p>
            </div>

            {/* Overview Cards */}
            <div className="flex flex-col gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-xl shrink-0"><Target className="w-6 h-6 text-blue-600" /></div>
                <div>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Total Practiced</span>
                  <span className="text-2xl font-extrabold text-gray-900 leading-none block">{totalStories}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-indigo-50 p-4 rounded-xl shrink-0"><TrendingUp className="w-6 h-6 text-indigo-600" /></div>
                <div>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Average Score</span>
                  <span className="text-2xl font-extrabold text-gray-900 leading-none block">{avgScore}</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-amber-50 p-4 rounded-xl shrink-0"><Star className="w-6 h-6 text-amber-500" /></div>
                <div>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wider block">Best Score</span>
                  <span className="text-2xl font-extrabold text-gray-900 leading-none block">{bestScore}</span>
                </div>
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => navigate('/guided')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <Target className="w-5 h-5" /> Practice More
              </button>
              <button 
                onClick={() => navigate('/history')}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-4 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-lg"
              >
                <History className="w-5 h-5 text-gray-500" /> View History
              </button>
            </div>
          </div>
        }
        main={
          <div className="flex flex-col gap-6">
            {/* Score Trend Chart */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-gray-400" /> Score Trend
              </h2>
              
              <div className="h-64 flex items-end justify-between items-stretch gap-4 pt-4 px-4 border-b border-gray-200">
                {MOCK_SCORES.map((score, index) => (
                  <div key={index} className="flex-1 flex flex-col justify-end items-center group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-10 bg-gray-900 text-white text-sm font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {score} Points
                    </div>
                    <div 
                      className="w-full max-w-[60px] bg-blue-500 rounded-t-lg hover:bg-blue-400 transition-colors"
                      style={{ height: `${score}%` }}
                    />
                    <span className="text-sm font-medium text-gray-500 mt-3 hidden sm:block">Attempt {index + 1}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skill Improvement & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Progress Bars */}
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
                <h2 className="text-lg font-bold text-gray-900">Skill Breakdown</h2>
                <div className="space-y-6">
                  {SKILLS.map(skill => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-gray-700 text-base">{skill.name}</span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{skill.change}</span>
                      </div>
                      <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${skill.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Insights */}
              <section className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-sm border border-indigo-100 space-y-5">
                <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Smart Insights
                </h2>
                <ul className="space-y-4">
                  <li className="bg-white p-5 rounded-xl shadow-sm text-base font-medium text-gray-800 border border-gray-100 flex gap-3">
                    <span className="shrink-0 text-xl">🚀</span> Your scores improved consistently in the last 3 attempts.
                  </li>
                  <li className="bg-white p-5 rounded-xl shadow-sm text-base font-medium text-gray-800 border border-gray-100 flex gap-3">
                    <span className="shrink-0 text-xl">💬</span> You improved clarity significantly this week (+20%).
                  </li>
                  <li className="bg-white p-5 rounded-xl shadow-sm text-base font-medium text-gray-800 border border-gray-100 border-l-4 border-l-amber-400 flex gap-3">
                    <span className="shrink-0 text-xl">⚠️</span> Focus more on emotional depth in your next practice session.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        }
      />
    </div>
  );
}
