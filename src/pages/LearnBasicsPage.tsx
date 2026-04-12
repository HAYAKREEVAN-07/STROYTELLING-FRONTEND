import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Heart, FileText, CheckCircle2 } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { Header } from '../components/Header';
import { FlowIndicator } from '../components/FlowIndicator';

export function LearnBasicsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header title="What, Why & How of Storytelling" />
      <div className="w-full px-6 lg:px-12 pt-8">
        <FlowIndicator currentStep="Learn" />
      </div>
      
      <PageLayout
        mode="main-right"
        main={
          <>
            {/* Header Section */}
            <div className="space-y-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">The Art of Storytelling</h1>
              <p className="text-xl text-gray-500 max-w-2xl">Master the fundamentals to communicate better, connect deeper, and leave a lasting impact everywhere you go.</p>
            </div>

            {/* What is it? */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><BookOpen /></div>
                <h2 className="text-2xl font-bold text-gray-900">1. What is Storytelling?</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Storytelling isn't just reciting facts. It’s the art of framing events emotionally. It’s taking a simple event and giving it context, stakes, and human emotion.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Example</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 italic border-l-4 border-red-300 pl-4 py-1">
                    <span className="font-bold text-red-700 not-italic block text-xs uppercase mb-1">Bad vs Good</span>
                    "I missed my train today."
                  </p>
                  <p className="text-gray-700 italic border-l-4 border-green-400 pl-4 py-1">
                    "I sprinted down the stairs, coffee spelling everywhere, only to watch the doors close right as I reached out my hand. That train was my only chance to make the interview."
                  </p>
                </div>
              </div>
            </section>

            {/* Why It Matters */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><Target /></div>
                <h2 className="text-2xl font-bold text-gray-900">2. Why It Matters</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you're in a job interview, pitching a product, or just entertaining friends at dinner, storytelling is the ultimate tool for persuasion and connection.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong className="text-gray-900">In Interviews:</strong> Proves your competence through real experiences.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong className="text-gray-900">In Leadership:</strong> Connects teams to a shared vision.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong className="text-gray-900">In Life:</strong> Makes you memorable and engaging to be around.</span>
                </li>
              </ul>
            </section>

            {/* How To Do It */}
            <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><Heart /></div>
                <h2 className="text-2xl font-bold text-gray-900">3. How to Do It</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Structure</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">Always have a clear beginning (hook), middle (conflict), and end (resolution/impact).</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Emotion</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">Describe <span className="bg-yellow-100 text-yellow-800 px-1 rounded">how you felt</span>, not just what happened. Make it relatable.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-2">Clarity</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">Trim the fat. If a detail <span className="underline decoration-red-300 decoration-2">doesn't push the story forward</span>, cut it out entirely.</p>
                </div>
              </div>
            </section>
          </>
        }
        right={
          <div className="sticky top-6 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md">
              <h3 className="text-xl font-bold mb-2">Ready to Master It?</h3>
              <p className="text-blue-100 mb-6 text-sm">Follow our structured learning path to learn these concepts step by step.</p>
              <button 
                onClick={() => navigate('/learning')}
                className="w-full bg-white text-blue-700 hover:bg-gray-50 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                Start Learning Path
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Just want to write?</h3>
              <p className="text-gray-500 text-sm mb-4">Skip the theory and directly input your story.</p>
              <button 
                onClick={() => navigate('/submit')}
                className="w-full bg-gray-900 text-white hover:bg-gray-800 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                Submit Story
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
